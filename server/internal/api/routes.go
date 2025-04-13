// internal/api/routes.go
package api

import (
	"kanban/internal/api/handlers"
	"kanban/internal/api/middleware"

	"github.com/gin-gonic/gin"
)

// SetupRouter configures the Gin router with all API routes
func SetupRouter() *gin.Engine {
	router := gin.Default()

	// Apply global middleware
	router.Use(middleware.CORS())

	// API routes
	v1 := router.Group("/api/v1")
	{
		// Board endpoints
		boards := v1.Group("/boards")
		{
			boards.GET("", handlers.GetBoards)
			boards.GET("/:id", handlers.GetBoard)
			boards.POST("", handlers.CreateBoard)
			boards.PUT("/:id", handlers.UpdateBoard)
			boards.DELETE("/:id", handlers.DeleteBoard)
		}

		// Column endpoints
		columns := v1.Group("/columns")
		{
			columns.GET("", handlers.GetColumns)
			columns.GET("/:id", handlers.GetColumn)
			columns.POST("", handlers.CreateColumn)
			columns.PUT("/:id", handlers.UpdateColumn)
			columns.DELETE("/:id", handlers.DeleteColumn)
		}

		// Card endpoints
		cards := v1.Group("/cards")
		{
			cards.GET("", handlers.GetCards)
			cards.GET("/:id", handlers.GetCard)
			cards.POST("", handlers.CreateCard)
			cards.PUT("/:id", handlers.UpdateCard)
			cards.DELETE("/:id", handlers.DeleteCard)
			cards.PUT("/:id/move", handlers.MoveCard)
		}
	}

	return router
}
