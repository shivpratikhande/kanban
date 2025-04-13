// internal/services/column_service.go
package services

import (
	"errors"
	"kanban/internal/db"
	"kanban/internal/models"
)

// GetColumns returns all columns or filtered by board ID
func GetColumns(boardID *uint) ([]models.Column, error) {
	var columns []models.Column
	query := db.DB

	if boardID != nil {
		query = query.Where("board_id = ?", *boardID)
	}

	result := query.Order("board_id, `order`").Find(&columns)
	if result.Error != nil {
		return nil, result.Error
	}

	return columns, nil
}

// GetColumnByID returns a column by ID with preloaded cards
func GetColumnByID(id uint) (*models.Column, error) {
	var column models.Column
	result := db.DB.Preload("Cards").First(&column, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &column, nil
}

// CreateColumn creates a new column with proper ordering
func CreateColumn(column *models.Column) error {
	// Get the max order value for this board
	var maxOrder int
	db.DB.Model(&models.Column{}).Where("board_id = ?", column.BoardID).
		Select("COALESCE(MAX(`order`), -1)").Scan(&maxOrder)

	column.Order = maxOrder + 1
	result := db.DB.Create(column)
	return result.Error
}

// UpdateColumn updates an existing column
func UpdateColumn(column *models.Column) error {
	// Check if column exists
	var existingColumn models.Column
	if err := db.DB.First(&existingColumn, column.ID).Error; err != nil {
		return errors.New("column not found")
	}

	// If board ID changed, update ordering
	if existingColumn.BoardID != column.BoardID {
		// Get the max order value for the new board
		var maxOrder int
		db.DB.Model(&models.Column{}).Where("board_id = ?", column.BoardID).
			Select("COALESCE(MAX(`order`), -1)").Scan(&maxOrder)
		column.Order = maxOrder + 1

		// Update ordering in the old board
		db.DB.Exec("UPDATE columns SET `order` = `order` - 1 WHERE board_id = ? AND `order` > ?",
			existingColumn.BoardID, existingColumn.Order)
	}

	// Update column
	return db.DB.Save(column).Error
}

// DeleteColumn deletes a column and its associated cards
func DeleteColumn(id uint) error {
	// Check if column exists
	var column models.Column
	if err := db.DB.First(&column, id).Error; err != nil {
		return errors.New("column not found")
	}

	// Start a transaction
	tx := db.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// Delete associated cards
	if err := tx.Where("column_id = ?", id).Delete(&models.Card{}).Error; err != nil {
		tx.Rollback()
		return err
	}

	// Delete column
	if err := tx.Delete(&column).Error; err != nil {
		tx.Rollback()
		return err
	}

	// Update ordering of remaining columns in the board
	if err := tx.Exec("UPDATE columns SET `order` = `order` - 1 WHERE board_id = ? AND `order` > ?",
		column.BoardID, column.Order).Error; err != nil {
		tx.Rollback()
		return err
	}

	// Commit transaction
	return tx.Commit().Error
}
