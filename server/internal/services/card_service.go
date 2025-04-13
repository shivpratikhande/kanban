// internal/services/card_service.go
package services

import (
	"errors"
	"kanban/internal/db"
	"kanban/internal/models"
)

// GetCards returns all cards or filtered by column ID
func GetCards(columnID *uint) ([]models.Card, error) {
	var cards []models.Card
	query := db.DB

	if columnID != nil {
		query = query.Where("column_id = ?", *columnID)
	}

	result := query.Order("column_id, `order`").Find(&cards)
	if result.Error != nil {
		return nil, result.Error
	}

	return cards, nil
}

// GetCardByID returns a card by ID
func GetCardByID(id uint) (*models.Card, error) {
	var card models.Card
	result := db.DB.First(&card, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &card, nil
}

// CreateCard creates a new card with proper ordering
func CreateCard(card *models.Card) error {
	// Get the max order value for this column
	var maxOrder int
	db.DB.Model(&models.Card{}).Where("column_id = ?", card.ColumnID).
		Select("COALESCE(MAX(`order`), -1)").Scan(&maxOrder)

	card.Order = maxOrder + 1
	result := db.DB.Create(card)
	return result.Error
}

// UpdateCard updates an existing card
func UpdateCard(card *models.Card) error {
	// Check if card exists
	var existingCard models.Card
	if err := db.DB.First(&existingCard, card.ID).Error; err != nil {
		return errors.New("card not found")
	}

	// If column ID changed, update ordering
	if existingCard.ColumnID != card.ColumnID {
		// Get the max order value for the new column
		var maxOrder int
		db.DB.Model(&models.Card{}).Where("column_id = ?", card.ColumnID).
			Select("COALESCE(MAX(`order`), -1)").Scan(&maxOrder)
		card.Order = maxOrder + 1

		// Update ordering in the old column
		db.DB.Exec("UPDATE cards SET `order` = `order` - 1 WHERE column_id = ? AND `order` > ?",
			existingCard.ColumnID, existingCard.Order)
	}

	// Update card
	return db.DB.Save(card).Error
}

// DeleteCard deletes a card
func DeleteCard(id uint) error {
	// Check if card exists
	var card models.Card
	if err := db.DB.First(&card, id).Error; err != nil {
		return errors.New("card not found")
	}

	// Start a transaction
	tx := db.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// Delete card
	if err := tx.Delete(&card).Error; err != nil {
		tx.Rollback()
		return err
	}

	// Update ordering of remaining cards in the column
	if err := tx.Exec("UPDATE cards SET `order` = `order` - 1 WHERE column_id = ? AND `order` > ?",
		card.ColumnID, card.Order).Error; err != nil {
		tx.Rollback()
		return err
	}

	// Commit transaction
	return tx.Commit().Error
}

// MoveCard moves a card to a different column or position
// internal/services/card_service.go (continued)

// MoveCard moves a card to a different column or position
func MoveCard(cardID uint, columnID uint, order int) (*models.Card, error) {
	// Get card
	var card models.Card
	if err := db.DB.First(&card, cardID).Error; err != nil {
		return nil, errors.New("card not found")
	}

	// Start a transaction
	tx := db.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// Handle reordering within the same column
	if card.ColumnID == columnID {
		if card.Order < order {
			// Moving down - update cards between old and new position
			tx.Exec("UPDATE cards SET `order` = `order` - 1 WHERE column_id = ? AND `order` > ? AND `order` <= ?",
				card.ColumnID, card.Order, order)
		} else if card.Order > order {
			// Moving up - update cards between new and old position
			tx.Exec("UPDATE cards SET `order` = `order` + 1 WHERE column_id = ? AND `order` >= ? AND `order` < ?",
				card.ColumnID, order, card.Order)
		} else {
			// Position didn't change
			tx.Rollback()
			return &card, nil
		}
	} else {
		// Moving to a different column
		// Update order in the old column
		tx.Exec("UPDATE cards SET `order` = `order` - 1 WHERE column_id = ? AND `order` > ?",
			card.ColumnID, card.Order)

		// Make space in the new column
		tx.Exec("UPDATE cards SET `order` = `order` + 1 WHERE column_id = ? AND `order` >= ?",
			columnID, order)
	}

	// Update the card
	card.ColumnID = columnID
	card.Order = order

	if err := tx.Save(&card).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	// Commit transaction
	if err := tx.Commit().Error; err != nil {
		return nil, err
	}

	return &card, nil
}
