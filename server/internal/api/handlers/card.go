// internal/api/handlers/card.go
package handlers

import (
	"kanban/internal/models"
	"kanban/internal/services"
	"kanban/pkg/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetCards returns all cards or filtered by column_id
func GetCards(c *gin.Context) {
	columnIDStr := c.Query("column_id")
	var columnID *uint

	if columnIDStr != "" {
		id, err := strconv.ParseUint(columnIDStr, 10, 32)
		if err != nil {
			utils.RespondWithError(c, http.StatusBadRequest, "Invalid column ID")
			return
		}
		parsedID := uint(id)
		columnID = &parsedID
	}

	cards, err := services.GetCards(columnID)
	if err != nil {
		utils.RespondWithError(c, http.StatusInternalServerError, "Failed to axios cards")
		return
	}

	c.JSON(http.StatusOK, cards)
}

// GetCard returns a specific card by ID
func GetCard(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		utils.RespondWithError(c, http.StatusBadRequest, "Invalid card ID")
		return
	}

	card, err := services.GetCardByID(uint(id))
	if err != nil {
		utils.RespondWithError(c, http.StatusNotFound, "Card not found")
		return
	}

	c.JSON(http.StatusOK, card)
}

// CreateCard creates a new card
func CreateCard(c *gin.Context) {
	var card models.Card
	if err := c.ShouldBindJSON(&card); err != nil {
		utils.RespondWithError(c, http.StatusBadRequest, err.Error())
		return
	}

	if err := services.CreateCard(&card); err != nil {
		utils.RespondWithError(c, http.StatusInternalServerError, "Failed to create card")
		return
	}

	c.JSON(http.StatusCreated, card)
}

// UpdateCard updates an existing card
func UpdateCard(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		utils.RespondWithError(c, http.StatusBadRequest, "Invalid card ID")
		return
	}

	var card models.Card
	if err := c.ShouldBindJSON(&card); err != nil {
		utils.RespondWithError(c, http.StatusBadRequest, err.Error())
		return
	}

	card.ID = uint(id)
	if err := services.UpdateCard(&card); err != nil {
		utils.RespondWithError(c, http.StatusInternalServerError, "Failed to update card")
		return
	}

	c.JSON(http.StatusOK, card)
}

// DeleteCard deletes a card
func DeleteCard(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		utils.RespondWithError(c, http.StatusBadRequest, "Invalid card ID")
		return
	}

	if err := services.DeleteCard(uint(id)); err != nil {
		utils.RespondWithError(c, http.StatusInternalServerError, "Failed to delete card")
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Card deleted successfully"})
}

// MoveCard moves a card to a different column or position
func MoveCard(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		utils.RespondWithError(c, http.StatusBadRequest, "Invalid card ID")
		return
	}

	type MoveRequest struct {
		ColumnID uint `json:"column_id"`
		Order    int  `json:"order"`
	}

	var req MoveRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.RespondWithError(c, http.StatusBadRequest, err.Error())
		return
	}

	card, err := services.MoveCard(uint(id), req.ColumnID, req.Order)
	if err != nil {
		utils.RespondWithError(c, http.StatusInternalServerError, "Failed to move card")
		return
	}

	c.JSON(http.StatusOK, card)
}
