// internal/services/board_service.go
package services

import (
	"errors"
	"kanban/internal/db"
	"kanban/internal/models"
)

// GetAllBoards returns all boards
func GetAllBoards() ([]models.Board, error) {
	var boards []models.Board
	result := db.DB.Find(&boards)
	if result.Error != nil {
		return nil, result.Error
	}
	return boards, nil
}

// GetBoardByID returns a board by ID with preloaded columns and cards
func GetBoardByID(id uint) (*models.Board, error) {
	var board models.Board
	result := db.DB.Preload("Columns.Cards").First(&board, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &board, nil
}

// CreateBoard creates a new board
func CreateBoard(board *models.Board) error {
	result := db.DB.Create(board)
	return result.Error
}

// UpdateBoard updates an existing board
func UpdateBoard(board *models.Board) error {
	// Check if board exists
	var existingBoard models.Board
	if err := db.DB.First(&existingBoard, board.ID).Error; err != nil {
		return errors.New("board not found")
	}

	// Update board
	return db.DB.Save(board).Error
}

// DeleteBoard deletes a board and its associated columns and cards
func DeleteBoard(id uint) error {
	// Check if board exists
	var board models.Board
	if err := db.DB.First(&board, id).Error; err != nil {
		return errors.New("board not found")
	}

	// Start a transaction
	tx := db.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// Find all columns for this board
	var columns []models.Column
	if err := tx.Where("board_id = ?", id).Find(&columns).Error; err != nil {
		tx.Rollback()
		return err
	}

	// Delete cards in all columns
	for _, column := range columns {
		if err := tx.Where("column_id = ?", column.ID).Delete(&models.Card{}).Error; err != nil {
			tx.Rollback()
			return err
		}
	}

	// Delete columns
	if err := tx.Where("board_id = ?", id).Delete(&models.Column{}).Error; err != nil {
		tx.Rollback()
		return err
	}

	// Delete board
	if err := tx.Delete(&board).Error; err != nil {
		tx.Rollback()
		return err
	}

	// Commit transaction
	return tx.Commit().Error
}
