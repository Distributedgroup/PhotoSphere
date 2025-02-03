package main

import (
	"fmt"
	"log"
	"net/http"

	"CreateStoryService/database"
	"CreateStoryService/routes"
)

func main() {
	database.ConnectDB()
	r := routes.SetupRoutes()

	port := ":4201"
	fmt.Println("Servidor corriendo en el puerto", port)
	log.Fatal(http.ListenAndServe(port, r))
}