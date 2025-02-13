# Project Documentation

## Overview
This project is a **microservices-based system** deployed on **AWS EC2 instances**, using **Amazon Linux and Ubuntu** as operating systems. The architecture follows a **modular domain-driven design**, separating concerns into different **domains**, including **UserDomain, PostDomain, StoryDomain**, and others.  

The system integrates **multiple programming languages**, including **Go, PHP, Python, and Node.js**, and interacts with **MongoDB and MySQL databases** to manage all required operations.

## Architecture

### Deployment
- The system is deployed on **AWS EC2 instances**.
- Uses **Amazon Linux** and **Ubuntu** as the primary operating systems.
- Services are **containerized** using **Docker**.
- CI/CD pipeline is **automated** using **GitHub Actions**.
- Each service has its own **deployment workflow** in `.github/workflows/`.

### Technology Stack
- **Backend Languages**: Go, PHP, Python, Node.js
- **Databases**: MongoDB, MySQL
- **API Communication**: REST & WebSockets
- **Containerization**: Docker
- **Authentication**: JWT-based authentication and API Gateway authorization.

## Domains and Services

### **UserDomain**
Handles all user-related operations, including authentication, profile management, password reset, and user relationships.

| Microservice | Description |
|-------------|-------------|
| `CreateUserService` | Registers new users |
| `LoginUserService` | Handles user authentication |
| `UpdateUserService` | Updates user details |
| `ValidateUserService` | Sends verification codes |
| `ValidateCodeService` | Validates codes for password recovery |
| `UpdateUserAvatarService` | Updates user profile pictures |
| `UpdateUserCoverService` | Manages user cover images |
| `SendFriendshipInvitationService` | Handles friend requests |
| `AcceptDenyInvitationService` | Accepts or denies invitations |
| `ResetPasswordService` | Resets user passwords |

### **PostDomain**
Handles posts, images, and interactions within the platform.

| Microservice | Description |
|-------------|-------------|
| `CreatePostService` | Creates new posts |
| `GetPostService` | Retrieves posts |
| `GetPostUserService` | Retrieves posts by user |
| `GetPostFriendsService` | Retrieves friends' posts |
| `GetPostImgService` | Retrieves post images |
| `SetCommentPostService` | Adds comments to posts |
| `SetLikePostService` | Manages likes on posts |
| `GetNotificationsService` | Handles post-related notifications |

### **StoryDomain**
Handles the creation and management of user stories.

| Microservice | Description |
|-------------|-------------|
| `CreateStoryService` | Creates new user stories |
| `GetUserStoriesService` | Retrieves stories by user |
| `GetStoryImgService` | Retrieves story images |

## API Gateway & Communication
- All microservices communicate via **REST APIs** and **WebSockets**.
- Services that require authentication use **JWT tokens**.
- Some API endpoints are **secured via middleware authentication**.

## CI/CD Pipeline
- Each microservice has its **own deployment YAML file** inside `.github/workflows/`.
- The pipeline **automates builds and deployments** to AWS EC2.
- Uses **Docker Hub** as an image registry for microservices.

## Database Configuration
- **MongoDB** is used for **NoSQL data storage**, particularly for **users, posts, and stories**.
- **MySQL** is used for **structured relational data** where required.
- Each microservice connects to **its designated database instance**.

## Frontend
- The frontend is located in the **`front/`** directory.
- Built with **Angular**.
- Hosted on an **NGINX server** with a `Dockerfile` for deployment.

## Conclusion
This system is a **scalable, microservices-based architecture** that integrates multiple **programming languages, databases, and cloud technologies**. It ensures **high availability, modularity, and maintainability** through its **containerized** and **automated CI/CD pipeline**.

---
