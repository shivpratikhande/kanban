// internal/models/column.go
package models

import (
	"time"
)

// Column represents a column in a kanban board
type Column struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Name      string    `json:"name" binding:"required"`
	BoardID   uint      `json:"board_id"`
	Order     int       `json:"order"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Cards     []Card    `json:"cards,omitempty" gorm:"foreignKey:ColumnID"`
}
