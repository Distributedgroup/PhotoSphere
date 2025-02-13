# GetUserUsernameService

## Overview

**GetUserUsernameService** is a microservice that retrieves user information by username from the PhotoSphere platform. It is deployed on an EC2 instance and runs on port `5066`. The service fetches user data from a **MongoDB** database and retrieves friendship count from a **MySQL** database.

## Features

- Retrieves user information by username.
- Fetches friendship count from MySQL.
- Uses JWT authentication for secure access.
- Implements Express.js for API handling.
- Uses Docker for containerization and GitHub Actions for deployment automation.

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **MySQL (MySQL2)**
- **JWT (JSON Web Token)**
- **Docker**
- **GitHub Actions**

## API Endpoints

### Get User by Username

**Endpoint:** `GET /api/get_user_username/{username}`

**Request Parameters:**

- `username` (string): The username of the user.

**Headers:**

- `Authorization`: Bearer token required for authentication.

**Response:**

- Returns user details and the number of friends.
- `403 Forbidden` if authentication fails.
- `500 Internal Server Error` if there is an issue with the server.

## Deployment

The service is deployed using **Docker** and **GitHub Actions**. The deployment pipeline includes:

1. **Building the Docker Image:**
   - The `Dockerfile` defines the Node.js environment and dependencies.
   - The image is pushed to Docker Hub.

2. **Deploying to EC2:**
   - The GitHub Actions workflow connects to the EC2 instance.
   - Pulls the latest Docker image.
   - Stops and removes the existing container.
   - Runs a new container on port `5066`.

## Running Locally

To run the service locally, follow these steps:

1. **Clone the repository:**
   
   ```bash
   git clone https://github.com/Distributedgroup/PhotoSphere/GetUserUsernameService.git
   cd GetUserUsernameService
   ```

2. **Install dependencies:**
   
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your MongoDB connection string, MySQL credentials, and JWT secret.

4. **Start the service:**
   
   ```bash
   npm start
   ```

## Docker Usage

To build and run the service using Docker:

```bash
 docker build -t getuserusernameservice .
 docker run -d -p 5066:5066 getuserusernameservice
```

## Authentication

This service uses **JWT** for authentication. Tokens must be included in the `Authorization` header for protected routes.

## Contact

For any issues or questions, please open an issue in the repository or contact the development team.
