package main

import (
	"fmt"
	"log"

	"CreateStoryService/helpers" 
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func main() {

	userID := primitive.NewObjectID() 

	names := "Juan"
	surnames := "Pérez"
	email := "juan.perez@example.com"

	// Generar el token con el ObjectID correcto
	token, err := helpers.CreateToken(userID, names, surnames, email)
	if err != nil {
		log.Fatalf("Error al generar el token: %v", err)
	}


	fmt.Println("Token JWT generado:")
	fmt.Println(token)
}