package Model

import (
	"time"
	"go.mongodb.org/mongo-driver/bson/primitive"
)


type Story struct {
	// ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Image     string             `bson:"image" json:"image"`
	User      primitive.ObjectID `bson:"user,omitempty" json:"user"`
	Exp       time.Time          `bson:"exp" json:"exp"`
	CreatedAt time.Time          `bson:"createdAt,omitempty" json:"createdAt,omitempty"`
}
