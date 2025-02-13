# LoginUserService

## Overview

**LoginUserService** is a microservice that handles user authentication for the PhotoSphere platform. It is deployed on an EC2 instance and runs on port `5052`. The service verifies user credentials using **MongoDB** and generates authentication tokens using **JWT**.

## Features

- Authenticates users via email and password.
- Generates JWT tokens upon successful login.
- Uses bcrypt for password hashing verification.
- Implements Express.js for API handling.
- Uses Docker for containerization and GitHub Actions for deployment automation.

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT (JSON Web Token)**
- **Bcrypt**
- **Docker**
- **GitHub Actions**

## API Endpoints

### User Login

**Endpoint:** `POST /api/login_user`

**Request Body:**

```json
{
    "email": "user@example.com",
    "password": "securepassword"
}
```

**Response:**

- If login is successful:

```json
{
    "data": {
        "_id": "60f7a5b9c7d1f63d9b38f9a2",
        "email": "user@example.com",
        "username": "@user123"
    },
    "token": "jwt_token_here"
}
```

- If login fails (wrong password or non-existent email):

```json
{
    "data": null,
    "message": "The password is incorrect" or "Email does not exist"
}
```

## Deployment

The service is deployed using **Docker** and **GitHub Actions**. The deployment pipeline includes:

1. **Building the Docker Image:**
   - The `Dockerfile` defines the Node.js environment and dependencies.
   - The image is pushed to Docker Hub.

2. **Deploying to EC2:**
   - The GitHub Actions workflow connects to the EC2 instance.
   - Pulls the latest Docker image.
   - Stops and removes the existing container.
   - Runs a new container on port `5052`.

## Running Locally

To run the service locally, follow these steps:

1. **Clone the repository:**
   
   ```bash
   git clone https://github.com/Distributedgroup/PhotoSphere/LoginUserService.git
   cd LoginUserService
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
 docker build -t loginuserservice .
 docker run -d -p 5052:5052 loginuserservice
```

## Authentication

This service uses **JWT** for authentication. Tokens must be included in the `Authorization` header for protected routes.

## Contact

For any issues or questions, please open an issue in the repository or contact the development team.
