// internal/api/handlers/column.go
package handlers

import (
	"kanban/internal/models"
	"kanban/internal/services"
	"kanban/pkg/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetColumns returns all columns or filtered by board_id
func GetColumns(c *gin.Context) {
	boardIDStr := c.Query("board_id")
	var boardID *uint

	if boardIDStr != "" {
		id, err := strconv.ParseUint(boardIDStr, 10, 32)
		if err != nil {
			utils.RespondWithError(c, http.StatusBadRequest, "Invalid board ID")
			return
		}
		parsedID := uint(id)
		boardID = &parsedID
	}

	columns, err := services.GetColumns(boardID)
	if err != nil {
		utils.RespondWithError(c, http.StatusInternalServerError, "Failed to fetch columns")
		return
	}

	c.JSON(http.StatusOK, columns)
}

// GetColumn returns a specific column by ID
func GetColumn(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		utils.RespondWithError(c, http.StatusBadRequest, "Invalid column ID")
		return
	}

	column, err := services.GetColumnByID(uint(id))
	if err != nil {
		utils.RespondWithError(c, http.StatusNotFound, "Column not found")
		return
	}

	c.JSON(http.StatusOK, column)
}

// CreateColumn creates a new column
func CreateColumn(c *gin.Context) {
	var column models.Column
	if err := c.ShouldBindJSON(&column); err != nil {
		utils.RespondWithError(c, http.StatusBadRequest, err.Error())
		return
	}

	if err := services.CreateColumn(&column); err != nil {
		utils.RespondWithError(c, http.StatusInternalServerError, "Failed to create column")
		return
	}

	c.JSON(http.StatusCreated, column)
}

// UpdateColumn updates an existing column
func UpdateColumn(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		utils.RespondWithError(c, http.StatusBadRequest, "Invalid column ID")
		return
	}

	var column models.Column
	if err := c.ShouldBindJSON(&column); err != nil {
		utils.RespondWithError(c, http.StatusBadRequest, err.Error())
		return
	}

	column.ID = uint(id)
	if err := services.UpdateColumn(&column); err != nil {
		utils.RespondWithError(c, http.StatusInternalServerError, "Failed to update column")
		return
	}

	c.JSON(http.StatusOK, column)
}

// DeleteColumn deletes a column
func DeleteColumn(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		utils.RespondWithError(c, http.StatusBadRequest, "Invalid column ID")
		return
	}

	if err := services.DeleteColumn(uint(id)); err != nil {
		utils.RespondWithError(c, http.StatusInternalServerError, "Failed to delete column")
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Column deleted successfully"})
}
