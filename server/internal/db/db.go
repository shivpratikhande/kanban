// internal/db/db.go
package db

import (
	"kanban/config"
	"kanban/internal/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

// Initialize sets up the database connection and migrations
func Initialize() error {
	var err error
	config := config.GetConfig()

	// Currently only supporting SQLite, but you can add more drivers
	DB, err = gorm.Open(sqlite.Open(config.DBPath), &gorm.Config{})
	if err != nil {
		return err
	}

	// Auto migrate the schema
	err = DB.AutoMigrate(
		&models.Board{},
		&models.Column{},
		&models.Card{},
	)
	if err != nil {
		return err
	}

	return nil
}
