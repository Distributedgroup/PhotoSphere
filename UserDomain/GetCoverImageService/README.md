# GetCoverImageService

## Overview

GetCoverImageService is a microservice that retrieves cover images from the PhotoSphere platform. It is deployed on an EC2 instance and runs on port `5062`. The service fetches images stored in the `uploads/portadas` directory.

## Features

- Retrieves cover images by filename.
- Uses FastAPI for efficient request handling.
- Implements authentication with JWT.
- Uses Docker for containerization and GitHub Actions for deployment automation.

## Technologies Used

- **Python**
- **FastAPI**
- **Motor (MongoDB Async Driver)**
- **JWT (JSON Web Token)**
- **Docker**
- **GitHub Actions**

## API Endpoints

### Get Cover Image

**Endpoint:** `GET /api/get_cover_img/{img}`

**Request Parameters:**

- `img` (string): The filename of the image to retrieve.

**Response:**

- Returns the requested image file.
- `404 Not Found` if the image does not exist.

## Deployment

The service is deployed using Docker and GitHub Actions. The deployment pipeline includes:

1. **Building the Docker Image:**
   - The `Dockerfile` defines the Python environment and dependencies.
   - The image is pushed to Docker Hub.

2. **Deploying to EC2:**
   - The GitHub Actions workflow connects to the EC2 instance.
   - Pulls the latest Docker image.
   - Stops and removes the existing container.
   - Runs a new container on port `5062`.

## Running Locally

To run the service locally, follow these steps:

1. **Clone the repository:**
   
   ```bash
   git clone https://github.com/Distributedgroup/PhotoSphere/GetCoverImageService.git
   cd GetCoverImageService
   ```

2. **Install dependencies:**
   
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables:**
   
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your MongoDB connection string and JWT secret.

4. **Start the service:**
   
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 5062 --reload
   ```

## Docker Usage

To build and run the service using Docker:

```bash
 docker build -t getcoverimageservice .
 docker run -d -p 5062:5062 getcoverimageservice
```

## Authentication

This service uses JWT for authentication. Tokens must be included in the `Authorization` header for protected routes.

## Contact

For any issues or questions, please open an issue in the repository or contact the development team.
