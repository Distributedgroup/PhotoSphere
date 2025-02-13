# ValidateUserService

## Description
ValidateUserService is a microservice responsible for validating user existence and generating a reset code for password recovery. This service is built with Node.js and MongoDB, utilizing Express for routing and JWT for authentication.

## Features
- Validate user existence by email.
- Generate a random reset code.
- Send the reset code via email.
- JWT-based authentication.
- Dockerized deployment.

## Technologies Used
- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework.
- **MongoDB**: NoSQL database.
- **Mongoose**: MongoDB ORM.
- **JWT**: JSON Web Token for authentication.
- **Docker**: Containerization.

## Project Structure
```
ValidateUserService/
│── Controller/
│   ├── validateUserController.js
│── Model/
│   ├── User.js
│── helpers/
│   ├── jwt.js
│── middlewares/
│   ├── auth.js
│── routes/
│   ├── validateUser.js
│── services/
│   ├── emailService.js
│── .env
│── Dockerfile
│── app.js
│── package.json
```

## Installation
### Prerequisites
- Node.js
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Distributedgroup/PhotoSphere/ValidateUserService.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ValidateUserService
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file and add the required environment variables:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```
5. Start the service:
   ```bash
   npm start
   ```

## API Endpoints
### Validate User
- **Endpoint**: `POST /api/validate_user`
- **Description**: Validates if a user exists and sends a reset code via email.
- **Request Body**:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "data": true
  }
  ```

## Docker Deployment
### Build and Run with Docker
1. Build the Docker image:
   ```bash
   docker build -t validateuserservice .
   ```
2. Run the container:
   ```bash
   docker run -d -p 5053:5053 --name validateuserservice validateuserservice
   ```

## Deployment with GitHub Actions
This service includes a GitHub Actions workflow (`deploy-validateuserservice.yml`) for CI/CD automation. The workflow builds and deploys the microservice to an EC2 instance.


## License
This project is licensed under the MIT License.

