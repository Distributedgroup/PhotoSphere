# GetUserService

## Overview

**GetUserService** is a microservice that retrieves user information from the PhotoSphere platform. It is deployed on an EC2 instance and runs on port `5068`. The service connects to a MongoDB database to fetch user details.

## Features

- Retrieves user information by user ID.
- Uses JWT authentication for secure access.
- Implements FastAPI for efficient request handling.
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

### Get User Information

**Endpoint:** `GET /api/get_user/{id}`

**Request Parameters:**

- `id` (string): The unique identifier of the user.

**Headers:**

- `Authorization`: Bearer token required for authentication.

**Response:**

- Returns user details if authenticated.
- `403 Forbidden` if authentication fails.
- `404 Not Found` if the user does not exist.

## Deployment

The service is deployed using **Docker** and **GitHub Actions**. The deployment pipeline includes:

1. **Building the Docker Image:**
   - The `Dockerfile` defines the Node.js environment and dependencies.
   - The image is pushed to Docker Hub.

2. **Deploying to EC2:**
   - The GitHub Actions workflow connects to the EC2 instance.
   - Pulls the latest Docker image.
   - Stops and removes the existing container.
   - Runs a new container on port `5068`.

## Running Locally

To run the service locally, follow these steps:

1. **Clone the repository:**
   
   ```bash
   git clone https://github.com/Distributedgroup/PhotoSphere/GetUserService.git
   cd GetUserService
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
 docker build -t getuserservice .
 docker run -d -p 5068:5068 getuserservice
```

## Authentication

This service uses **JWT** for authentication. Tokens must be included in the `Authorization` header for protected routes.

## Contact

For any issues or questions, please open an issue in the repository or contact the development team.
