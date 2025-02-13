# SendFriendshipInvitationService

## Overview

**SendFriendshipInvitationService** is a microservice that handles friendship invitation requests in the PhotoSphere platform. It is deployed on an EC2 instance and runs on port `5069`. The service interacts with two separate **MongoDB** databases: one for user data and another for friendship invitations.

## Features

- Allows users to send friendship invitations.
- Stores user data in **MongoDB 1**.
- Stores friendship invitations in **MongoDB 2**.
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

### Send Friendship Invitation

**Endpoint:** `POST /api/send_friendship_invitation`

**Request Body:**

```json
{
    "recipient_user": "60f7a5b9c7d1f63d9b38f9a2"
}
```

**Headers:**

- `Authorization`: Bearer token required for authentication.

**Response:**

- If the invitation is sent successfully:

```json
{
    "data": {
        "user_origin": "60f7a5b9c7d1f63d9b38f9a1",
        "recipient_user": "60f7a5b9c7d1f63d9b38f9a2",
        "createdAt": "2024-02-13T10:00:00.000Z"
    }
}
```

- If authentication fails:

```json
{
    "message": "NoAccess"
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
   - Runs a new container on port `5069`.

## Running Locally

To run the service locally, follow these steps:

1. **Clone the repository:**
   
   ```bash
   git clone https://Distributedgroup/PhotoSphere/SendFriendshipInvitationService.git
   cd SendFriendshipInvitationService
   ```

2. **Install dependencies:**
   
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your MongoDB connections and JWT secret.

4. **Start the service:**
   
   ```bash
   npm start
   ```

## Docker Usage

To build and run the service using Docker:

```bash
 docker build -t sendfriendshipinvitationservice .
 docker run -d -p 5069:5069 sendfriendshipinvitationservice
```

## Authentication

This service uses **JWT** for authentication. Tokens must be included in the `Authorization` header for protected routes.

## Contact

For any issues or questions, please open an issue in the repository or contact the development team.
