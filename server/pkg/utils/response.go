// pkg/utils/response.go
package utils

import (
	"github.com/gin-gonic/gin"
)

// RespondWithError sends an error response
func RespondWithError(c *gin.Context, code int, message string) {
	c.JSON(code, gin.H{"error": message})
}

// RespondWithSuccess sends a success response
func RespondWithSuccess(c *gin.Context, code int, data interface{}) {
	c.JSON(code, data)
}
