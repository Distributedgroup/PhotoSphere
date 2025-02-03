package main

import (
	"fmt"
	"log"
	"net/http"
	"GetStoryImgService/routes"
)

func main() {

	router := routes.SetupRoutes()
	port := ":8080"

	fmt.Println("🚀 Server running on http://localhost" + port)
	log.Fatal(http.ListenAndServe(port, router))
}