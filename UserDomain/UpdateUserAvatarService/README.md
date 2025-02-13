# UpdateUserAvatarService

## Description
The **UpdateUserAvatarService** is a microservice that allows authenticated users to update their avatar image. This service is built using **Node.js, Express, and MongoDB**, and is deployed on an **AWS EC2 instance**.

## Features
- Users can update their avatar images.
- Requires authentication using JWT.
- Saves user data in **MongoDB**.
- Uses **multipart form-data** for image uploads.
- Deployed using **Docker** and **GitHub Actions**.

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT Authentication**
- **Docker**
- **GitHub Actions**

## Installation
### Clone the repository
```sh
git clone https://github.com/Distributedgroup/PhotoSphere/UpdateUserAvatarService.git
cd UpdateUserAvatarService
```

### Install dependencies
```sh
npm install
```

### Environment Variables
Create a `.env` file in the root directory and add the following:
```env
MONGO_URI=mongodb://your-mongodb-uri
SECRET_KEY=your-secret-key
```

## Running the Service
### Using Node.js
```sh
npm start
```

### Using Docker
```sh
docker build -t updateuseravatarservice .
docker run -d -p 5056:5056 --name updateuseravatarservice updateuseravatarservice
```

## API Endpoints
### Update User Avatar
**Endpoint:**
```http
POST /api/update_user_avatar
```

**Headers:**
```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

**Request Body (multipart/form-data):**
```json
{
  "avatar": "(image file)"
}
```

**Response:**
```json
{
  "data": {
    "message": "Avatar updated successfully"
  }
}
```

## Deployment
This service is deployed on an **AWS EC2 instance** using **Docker**. The deployment process is automated using **GitHub Actions**.

## License
This project is licensed under the **MIT License**.

## Contributors
- **Your Name** - [GitHub](https://github.com/your-profile)
