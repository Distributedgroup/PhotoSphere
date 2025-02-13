# Update User Cover Service

## Description
The **Update User Cover Service** is a FastAPI-based microservice that allows users to update their profile cover image. The service saves the uploaded image and updates the corresponding user record in the MongoDB database.

## Features
- Secure user authentication using JWT.
- Upload and update user cover images.
- Stores images in a specified directory (`uploads/portadas`).
- Integrates with a MongoDB database.

## Technologies Used
- **Python 3.12**
- **FastAPI**
- **MongoDB (Motor)**
- **JWT Authentication**
- **Docker**

## Installation
### Prerequisites
- Python 3.12 or higher
- MongoDB instance running
- Docker (optional, for containerized deployment)

### Clone the Repository
```sh
$ git clone https://github.com/Distributedgroup/PhotoSphere/UpdateUserCoverService.git
$ cd UpdateUserCoverService
```

### Install Dependencies
```sh
$ pip install -r requirements.txt
```

### Set Up Environment Variables
Create a `.env` file in the root directory and configure the required variables:
```
SECRET_KEY=your_secret_key_here
MONGO_URI=mongodb://your_mongo_host:27017/userservice
UPLOAD_FOLDER=uploads/portadas
```

## Running the Service
### Locally
```sh
$ uvicorn main:app --host 0.0.0.0 --port 5061 --reload
```

### With Docker
```sh
$ docker build -t updateusercoverservice .
$ docker run -d -p 5061:5061 --name updateusercoverservice updateusercoverservice
```

## API Endpoints
### Base URL
```
http://localhost:5061/api
```

### Update User Cover
**Endpoint:**
```
POST /update_user_cover
```

**Headers:**
```json
{
  "Authorization": "Bearer <your_jwt_token>"
}
```

**Request (multipart/form-data):**
```
file: <image_file>
```

**Response:**
```json
{
  "message": "Updated cover",
  "portada": "image_filename.jpg"
}
```

## Project Structure
```
UpdateUserCoverService/
│── controller/
│   ├── update_user_cover_controller.py
│── helpers/
│   ├── jwt_helper.py
│── middlewares/
│   ├── auth.py
│── models/
│   ├── user.py
│── routes/
│   ├── update_user_cover.py
│── uploads/portadas/ (image storage)
│── .env
│── Dockerfile
│── main.py
│── requirements.txt
```

## Deployment
### With Docker on EC2
```sh
$ docker pull your-dockerhub/updateusercoverservice:latest
$ docker run -d --restart unless-stopped --name updateusercoverservice -p 5061:5061 your-dockerhub/updateusercoverservice:latest
```

## License
MIT License



