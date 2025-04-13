// internal/models/board.go
package models

import (
	"time"
)

// Board represents a kanban board
type Board struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Name      string    `json:"name" binding:"required"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Columns   []Column  `json:"columns,omitempty" gorm:"foreignKey:BoardID"`
}
