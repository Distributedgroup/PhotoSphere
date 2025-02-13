# ValidateCodeService

## Description
The `ValidateCodeService` is a microservice responsible for validating reset codes associated with user accounts. It checks if the provided code matches the one stored in the database for a given user.

## Technologies Used
- **FastAPI** - For handling API requests
- **MongoDB** - Database for storing user information
- **Motor** - Async driver for MongoDB
- **JWT** - For authentication and token validation
- **Docker** - For containerized deployment
- **Uvicorn** - ASGI server for FastAPI applications

## Installation
To run this service locally, follow these steps:

### Prerequisites
- Python 3.8+
- MongoDB instance running
- Docker (if using containers)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/Distributedgroup/PhotoSphere/ValidateCodeService.git
   cd ValidateCodeService
   ```
2. Create and activate a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Set up environment variables:
   Create a `.env` file and specify the following variables:
   ```env
   MONGO_URI=mongodb://your-mongo-instance:27017/userservice
   SECRET_KEY=your-secret-key
   ```
5. Run the service:
   ```sh
   uvicorn main:app --host 0.0.0.0 --port 5060 --reload
   ```

## API Endpoints

### Validate Code
- **Endpoint:** `GET /api/validate_code/{code}/{email}`
- **Description:** Validates the reset code for a user.
- **Parameters:**
  - `code` (string) - The reset code.
  - `email` (string) - The email of the user.
- **Response:**
  - `200 OK` - Returns `{ "data": true/false }` indicating if the code matches.
  - `404 Not Found` - If the user does not exist.

## Docker Setup
You can run this service inside a Docker container.

### Build the Docker Image
```sh
docker build -t validatecodeservice .
```

### Run the Docker Container
```sh
docker run -d --name validatecodeservice -p 5060:5060 validatecodeservice
```

## Deployment with GitHub Actions
This service is automatically built and deployed using **GitHub Actions**. The workflow file `deploy-validatecodeservice.yml` handles the CI/CD process.

## Contributors
- **Your Name** - Developer
- **Your Team** - Contributors

## License
This project is licensed under the MIT License - see the LICENSE file for details.

