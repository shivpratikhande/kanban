// internal/api/handlers/board.go
package handlers

import (
	"kanban/internal/models"
	"kanban/internal/services"
	"kanban/pkg/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetBoards returns all boards
func GetBoards(c *gin.Context) {
	boards, err := services.GetAllBoards()
	if err != nil {
		utils.RespondWithError(c, http.StatusInternalServerError, "Failed to axios boards")
		return
	}

	c.JSON(http.StatusOK, boards)
}

// GetBoard returns a specific board by ID
func GetBoard(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		utils.RespondWithError(c, http.StatusBadRequest, "Invalid board ID")
		return
	}

	board, err := services.GetBoardByID(uint(id))
	if err != nil {
		utils.RespondWithError(c, http.StatusNotFound, "Board not found")
		return
	}

	c.JSON(http.StatusOK, board)
}

// CreateBoard creates a new board
func CreateBoard(c *gin.Context) {
	var board models.Board
	if err := c.ShouldBindJSON(&board); err != nil {
		utils.RespondWithError(c, http.StatusBadRequest, err.Error())
		return
	}

	if err := services.CreateBoard(&board); err != nil {
		utils.RespondWithError(c, http.StatusInternalServerError, "Failed to create board")
		return
	}

	c.JSON(http.StatusCreated, board)
}

// UpdateBoard updates an existing board
func UpdateBoard(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		utils.RespondWithError(c, http.StatusBadRequest, "Invalid board ID")
		return
	}

	var board models.Board
	if err := c.ShouldBindJSON(&board); err != nil {
		utils.RespondWithError(c, http.StatusBadRequest, err.Error())
		return
	}

	board.ID = uint(id)
	if err := services.UpdateBoard(&board); err != nil {
		utils.RespondWithError(c, http.StatusInternalServerError, "Failed to update board")
		return
	}

	c.JSON(http.StatusOK, board)
}

// DeleteBoard deletes a board
func DeleteBoard(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		utils.RespondWithError(c, http.StatusBadRequest, "Invalid board ID")
		return
	}

	if err := services.DeleteBoard(uint(id)); err != nil {
		utils.RespondWithError(c, http.StatusInternalServerError, "Failed to delete board")
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Board deleted successfully"})
}
