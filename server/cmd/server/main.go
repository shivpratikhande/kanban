// cmd/server/main.go
package main

import (
	"kanban/internal/api"
	"kanban/internal/db"
	"log"
)

func main() {
	// Initialize database
	if err := db.Initialize(); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	// Initialize and run the server
	router := api.SetupRouter()
	log.Println("Starting server on :8080")
	router.Run(":8080")
}
