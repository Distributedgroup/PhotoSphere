package database

import (
	"context"
	"fmt"
	"log"
	"sync"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	clientInstance *mongo.Client
	clientInstanceError error
	mongoOnce sync.Once
	databaseName = "social" 
	mongoURI = "mongodb://127.0.0.1:27017"
)

func ConnectDB() {
	mongoOnce.Do(func() {
		clientOptions := options.Client().ApplyURI(mongoURI)
		client, err := mongo.Connect(context.TODO(), clientOptions)
		if err != nil {
			clientInstanceError = err
			log.Fatalf("Error connecting to MongoDB: %v", err)
			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		err = client.Ping(ctx, nil)
		if err != nil {
			clientInstanceError = err
			log.Fatalf("MongoDB ping error: %v", err)
			return
		}

		fmt.Println("Connected to MongoDB")
		clientInstance = client
	})
}

func GetMongoClient() (*mongo.Client, error) {
	if clientInstance == nil {
		ConnectDB()
	}
	return clientInstance, clientInstanceError
}

func GetDatabase() (*mongo.Database, error) {
	client, err := GetMongoClient()
	if err != nil {
		return nil, err
	}
	return client.Database(databaseName), nil
}

func CloseMongoDB() {
	if clientInstance != nil {
		err := clientInstance.Disconnect(context.TODO())
		if err != nil {
			log.Fatalf("Error closing MongoDB connection: %v", err)
		}
		fmt.Println("MongoDB connection closed")
	}
}