# UpdateUserService

## Overview
The **UpdateUserService** is a microservice responsible for updating user information in the system. This service provides an endpoint to update user profile details such as name, surname, gender, birth date, profession, phone, and description.

## Features
- Update user profile information.
- JWT-based authentication.
- MongoDB as the primary database.
- Docker containerization.
- CI/CD pipeline using GitHub Actions.

## Technologies Used
- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for user storage.
- **Mongoose**: ODM for MongoDB.
- **JWT (JSON Web Tokens)**: Authentication and authorization.
- **Docker**: Containerization.
- **Socket.io**: Real-time event handling.
- **GitHub Actions**: CI/CD automation.

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- Node.js v18+
- MongoDB
- Docker (optional for containerization)

### Clone the Repository
```sh
$ git clone https://github.com/Distributedgroup/PhotoSphere/UserDomain/UpdateUserService.git
$ cd UpdateUserService
```

### Install Dependencies
```sh
$ npm install
```

### Environment Variables
Create a `.env` file in the root directory and configure the necessary variables:
```
MONGO_URI=mongodb://localhost:27017/userservice
SECRET_KEY=your_secret_key
PORT=5051
```

### Run the Service
```sh
$ npm start
```
The service will run at `http://localhost:5051`.

---

## API Endpoints

### Update User Profile
**Endpoint:** `PUT /api/update_user/:id`

**Headers:**
```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

**Request Body:**
```json
{
  "names": "John",
  "surnames": "Doe",
  "gender": "Male",
  "birth": "1990-05-15",
  "profession": "Software Engineer",
  "phone": "+1234567890",
  "description": "Experienced developer."
}
```

**Response:**
```json
{
  "data": {
    "_id": "60d5f9b3fc13ae0c5b5e3e1c",
    "names": "John",
    "surnames": "Doe",
    "gender": "Male",
    "birth": "1990-05-15",
    "profession": "Software Engineer",
    "phone": "+1234567890",
    "description": "Experienced developer."
  }
}
```

---

## Docker Support
### Build Docker Image
```sh
$ docker build -t updateuserservice .
```

### Run Docker Container
```sh
$ docker run -d -p 5051:5051 --name updateuserservice updateuserservice
```

### Stop and Remove Container
```sh
$ docker stop updateuserservice
$ docker rm updateuserservice
```

---

## Deployment
The service includes a **GitHub Actions** workflow to automate the deployment process.

### CI/CD Pipeline
- **Builds and tests** the microservice.
- **Pushes the Docker image** to Docker Hub.
- **Deploys the service** to an EC2 instance.

### Trigger Deployment
Simply push your changes to the `dev` branch:
```sh
$ git push origin dev
```
The pipeline will automatically build and deploy the service.

---

## Contributors
- **Your Name** - [GitHub](https://github.com/your-github)

## License
This project is licensed under the MIT License - see the LICENSE file for details.

