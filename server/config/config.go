// config/config.go
package config

import (
	"os"
)

// Config holds application configuration
type Config struct {
	DBType     string
	DBPath     string
	ServerPort string
}

// GetConfig returns application configuration
func GetConfig() Config {
	// Default values
	config := Config{
		DBType:     "sqlite",
		DBPath:     "kanban.db",
		ServerPort: "8080",
	}

	// Override with environment variables if provided
	if dbType := os.Getenv("KANBAN_DB_TYPE"); dbType != "" {
		config.DBType = dbType
	}
	if dbPath := os.Getenv("KANBAN_DB_PATH"); dbPath != "" {
		config.DBPath = dbPath
	}
	if port := os.Getenv("KANBAN_PORT"); port != "" {
		config.ServerPort = port
	}

	return config
}
