# CreateUserService

## Overview

CreateUserService is a microservice that handles user registration in the PhotoSphere platform. It is deployed on an EC2 instance and runs on port `5050`. The service connects to a MongoDB database to store user information.

## Features

- Registers new users with encrypted passwords.
- Generates unique usernames automatically.
- Provides authentication using JWT.
- Implements middleware for request authentication.
- Uses Docker for containerization and GitHub Actions for deployment automation.

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT (JSON Web Token)**
- **Docker**
- **GitHub Actions**

## API Endpoints

### Create a User

**Endpoint:** `POST /api/create_user`

**Request Body:**

```json
{
    "names": "John",
    "surnames": "Doe",
    "email": "johndoe@example.com",
    "password": "securepassword",
    "country": "USA",
    "profession": "Engineer",
    "birth": "1990-05-15",
    "gender": "Male",
    "phone": "1234567890"
}
```

**Response:**

```json
{
    "data": {
        "_id": "60f7a5b9c7d1f63d9b38f9a2",
        "names": "John",
        "surnames": "Doe",
        "email": "johndoe@example.com",
        "username": "@JohnDoe123",
        "state": false,
        "createdAt": "2025-02-13T10:00:00Z"
    }
}
```

## Deployment

The service is deployed using Docker and GitHub Actions. The deployment pipeline includes:

1. **Building the Docker Image:**
   - The `Dockerfile` defines the Node.js environment and dependencies.
   - The image is pushed to Docker Hub.

2. **Deploying to EC2:**
   - The GitHub Actions workflow connects to the EC2 instance.
   - Pulls the latest Docker image.
   - Stops and removes the existing container.
   - Runs a new container on port `5050`.

## Running Locally

To run the service locally, follow these steps:

1. **Clone the repository:**
   
   ```bash
   git clone https://github.com/your-repo/CreateUserService.git
   cd CreateUserService
   ```

2. **Install dependencies:**
   
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your MongoDB connection string and JWT secret.

4. **Start the service:**
   
   ```bash
   npm start
   ```

## Docker Usage

To build and run the service using Docker:

```bash
docker build -t createuserservice .
docker run -d -p 5050:5050 createuserservice
```

## Authentication

This service uses JWT for authentication. Tokens are generated upon user creation and must be included in the `Authorization` header for protected routes.

## Contact

For any issues or questions, please open an issue in the repository or contact the development team.
