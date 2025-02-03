package main

import (

	"fmt"
	"log"
	"net/http"

	"GetUserStoriesService/database"
	"GetUserStoriesService/routes"
)

func main() {
	database.ConnectDB()
		// Crear un router
		mux := http.NewServeMux()

		// Registrar rutas correctamente
		routes.GetUserStoriesRoutes(mux)
	

	port := ":4201"
	fmt.Println("Servidor corriendo en el puerto", port)
	log.Fatal(http.ListenAndServe(port, mux))
}