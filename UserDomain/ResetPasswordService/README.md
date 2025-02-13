# ResetPasswordService

## Overview

**ResetPasswordService** is a microservice that handles password reset requests for users in the PhotoSphere platform. It is deployed on an EC2 instance and runs on port `5067`. The service interacts with **MongoDB** to manage user password resets.

## Features

- Allows users to reset their passwords via email.
- Verifies if the email exists in the database before resetting.
- Uses JWT authentication for secure access.
- Implements Express.js for API handling.
- Uses Docker for containerization and GitHub Actions for deployment automation.

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT (JSON Web Token)**
- **Docker**
- **GitHub Actions**

## API Endpoints

### Reset Password

**Endpoint:** `POST /api/reset_password/{email}`

**Request Parameters:**

- `email` (string): The email address of the user requesting a password reset.

**Response:**

- If the email exists in the system:

```json
{
    "message": "A password reset email has been sent."
}
```

- If the email does not exist:

```json
{
    "message": "Email does not exist."
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
   - Runs a new container on port `5067`.

## Running Locally

To run the service locally, follow these steps:

1. **Clone the repository:**
   
   ```bash
   git clone https://github.com/Distributedgroup/PhotoSphere/ResetPasswordService.git
   cd ResetPasswordService
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
 docker build -t resetpasswordservice .
 docker run -d -p 5067:5067 resetpasswordservice
```

## Authentication

This service uses **JWT** for authentication. Tokens must be included in the `Authorization` header for protected routes.

## Contact

For any issues or questions, please open an issue in the repository or contact the development team.
