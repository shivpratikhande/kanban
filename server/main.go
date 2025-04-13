package main

import (
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default() // like express()

    r.GET("/", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "Hello, World!",
        })
    })

    r.GET("/hello/:name", func(c *gin.Context) {
        name := c.Param("name")
        c.JSON(200, gin.H{
            "message": "Hello " + name,
        })
    })

    // Start server on port 8080
    r.Run(":8080")
}
