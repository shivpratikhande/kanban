// internal/models/card.go
package models

import (
	"time"
)

// Card represents a task card in a kanban column
type Card struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Title       string    `json:"title" binding:"required"`
	Description string    `json:"description"`
	ColumnID    uint      `json:"column_id"`
	Order       int       `json:"order"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	DueDate     time.Time `json:"due_date,omitempty"`
	Tags        string    `json:"tags"`
	AssignedTo  string    `json:"assigned_to"`
}
