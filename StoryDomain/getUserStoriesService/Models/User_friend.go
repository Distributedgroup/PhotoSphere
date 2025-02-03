package Models

import (
	"time"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserFriend struct {
	UserOrigin primitive.ObjectID `bson:"user_origin,omitempty" json:"user_origin"`
	UserFriend primitive.ObjectID `bson:"user_friend,omitempty" json:"user_friend"`
	CreatedAt  time.Time          `bson:"createdAt,omitempty" json:"createdAt,omitempty"`
}