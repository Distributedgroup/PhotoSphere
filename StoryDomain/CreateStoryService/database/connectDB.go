package database

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	

)

var DB *mongo.Database

func ConnectDB() *mongo.Client {
	// Definir la URI de MongoDB desde la variable de entorno o usar un valor por defecto
	MONGO_URI := os.Getenv("MONGO_URI")
	if MONGO_URI == "" {
		MONGO_URI = "mongodb://admin:secret@ec2-184-73-119-233.compute-1.amazonaws.com:27017/story?authSource=admin"
	}

	// Configurar las opciones del cliente
	clientOptions := options.Client().ApplyURI(MONGO_URI)

	// Conectar a la base de datos
	client, err := mongo.NewClient(clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	// Verificar la conexión
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("No se pudo conectar a MongoDB:", err)
	}

	fmt.Println("🚀 Conectado a MongoDB en", MONGO_URI)

	// Asignar la base de datos
	DB = client.Database("story")
	return client
}
