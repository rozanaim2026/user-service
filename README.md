<div align="center">

# 👤 LUCCI User Service

### Authentication & User Management Microservice for the LUCCI Cloud Native E-Commerce Platform

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Amazon ECS](https://img.shields.io/badge/Amazon_ECS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/ecs/)
[![Amazon ECR](https://img.shields.io/badge/Amazon_ECR-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/ecr/)
[![Amazon RDS](https://img.shields.io/badge/Amazon_RDS-527FFF?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/rds/)
[![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)](https://www.jenkins.io/)

<br/>

> Built using **Node.js + Express.js + MySQL**

> Containerized using **Docker**

> Automated deployment using **Jenkins + Amazon ECR + Amazon ECS Fargate**

> Provides secure authentication and user management for the LUCCI platform.

</div>

---

<a id="table-of-contents"></a>

# 📑 Table of Contents

- [Overview](#overview)
- [Service Responsibilities](#service-responsibilities)
- [Project Repositories](#project-repositories)
- [Architecture](#architecture)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Tech Stack](#tech-stack)
- [AWS Infrastructure](#aws-infrastructure)
- [CI/CD Pipeline](#cicd-pipeline)
- [Repository Structure](#repository-structure)
- [Deployment Flow](#deployment-flow)
- [Getting Started](#getting-started)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

<a id="overview"></a>

# 🔍 Overview

The User Service is a backend microservice responsible for authentication, authorization, user profile management, and address management within the LUCCI Cloud Native E-Commerce Platform.

It exposes REST APIs that allow users to register, log in securely using JWT authentication, manage their profile information, and maintain shipping addresses.

The service is containerized using Docker and deployed to Amazon ECS Fargate through a fully automated Jenkins CI/CD pipeline.

----
<a id="service-responsibilities"></a>

# 👤 Service Responsibilities

The User Service is responsible for:

- User Registration
- User Login
- JWT Authentication
- Password Encryption using bcrypt
- User Profile Management
- Address Management
- Authentication Middleware
- REST API Endpoints
- MySQL Database Integration
- Secure Authentication for Other Services

----

<a id="project-repositories"></a>

# 📦 Project Repositories

| Repository | Description |
|------------|-------------|
| [Frontend](https://github.com/rozanaim2026/frontend-aws-devops) | Customer-facing web application |
| **[User Service](https://github.com/rozanaim2026/user-service)** *(Current Repository)* | Authentication & User Management |
| [Product Service](https://github.com/rozanaim2026/product-service) | Product Catalog |
| [Order Service](https://github.com/rozanaim2026/order-service) | Order Processing |
| [Payment Service](https://github.com/rozanaim2026/payment-service) | Razorpay Integration |

---

<a id="architecture"></a>

# 🏗️ Architecture

```text
Frontend
     │
REST API Requests
     ▼
Application Load Balancer
     │
Amazon ECS Fargate
     │
User Service Container
     │
Amazon RDS MySQL
```

### Request Flow

1. The frontend sends authentication requests through the Application Load Balancer.

2. The ALB routes requests to the User Service running on Amazon ECS Fargate.

3. The service validates requests using JWT authentication middleware.

4. User information is securely stored and retrieved from Amazon RDS MySQL.

5. JSON responses are returned to the frontend through REST APIs.

---

<a id="features"></a>

# ✨ Features

- User Registration
- User Login & Authentication
- JWT-based Authorization
- Password Encryption using bcrypt
- User Profile Management
- Address Management
- RESTful API Endpoints
- MySQL Database Integration
- Docker Containerization
- Cloud-Native Deployment on Amazon ECS Fargate

---

<a id="api-endpoints"></a>

# 🔗 API Endpoints

The User Service exposes RESTful APIs for user authentication, profile management, and address management.

## Authentication APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/register` | Register a new user |
| `POST` | `/login` | Authenticate user and generate JWT token |
| `GET` | `/profile` | Retrieve authenticated user profile |

---

## Address APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/address` | Add a new shipping address |
| `GET` | `/address` | Retrieve all user addresses |
| `PUT` | `/address/:id` | Update an existing address |
| `DELETE` | `/address/:id` | Delete a saved address |

---

## Authentication

Protected endpoints require a valid JWT access token.

Example:

```http
Authorization: Bearer <your_jwt_token>
```

---

## Sample Response

```json
{
  "success": true,
  "message": "User logged in successfully",
  "token": "<jwt_token>"
}
```

<a id="tech-stack"></a>

# 🛠️ Tech Stack

| Category | Technology | Purpose |
|-----------|------------|---------|
| Backend | Node.js | Runtime Environment |
| Framework | Express.js | REST API Development |
| Database | MySQL | Persistent Data Storage |
| Authentication | JSON Web Token (JWT) | User Authentication |
| Security | bcrypt.js | Password Hashing |
| Containerization | Docker | Application Packaging |
| Container Registry | Amazon ECR | Docker Image Repository |
| Container Orchestration | Amazon ECS Fargate | Container Deployment |
| CI/CD | Jenkins | Automated Build & Deployment |
| Cloud Database | Amazon RDS | Managed MySQL Database |
| Version Control | Git & GitHub | Source Code Management |

---

<a id="aws-infrastructure"></a>

# ☁️ AWS Infrastructure

The User Service runs as a Docker container inside Amazon ECS Fargate and securely connects to an Amazon RDS MySQL database.

| AWS Service | Purpose |
|--------------|---------|
| Amazon ECS Fargate | Runs the User Service container |
| Amazon ECR | Stores Docker images |
| Amazon RDS MySQL | Stores user accounts and addresses |
| Application Load Balancer | Routes incoming API requests |
| IAM | Secure AWS access permissions |
| Security Groups | Network-level firewall rules |
| Jenkins | Automated CI/CD deployment |

---

<a id="cicd-pipeline"></a>

# 🚀 CI/CD Pipeline

The User Service is deployed automatically using Jenkins, Docker, Amazon ECR, and Amazon ECS Fargate.

```text
Developer
     │
Git Push
     ▼
GitHub Repository
     │
Webhook
     ▼
Jenkins Pipeline
     │
Checkout Source Code
     ▼
Build Docker Image
     ▼
Push Image to Amazon ECR
     ▼
Register New ECS Task Definition
     ▼
Update ECS Service
     ▼
Amazon ECS Fargate
```

---

## ⚙️ Jenkins Pipeline Stages

| Stage | Purpose |
|--------|---------|
| Checkout | Clone latest source code from GitHub |
| Login ECR | Authenticate Docker with Amazon ECR |
| Build & Push Image | Build Docker image and push tagged images to ECR |
| Create Task Revision | Register a new ECS Task Definition revision |
| Deploy New Revision | Update the ECS Service with the latest task definition |
| Cleanup | Remove unused Docker images from Jenkins |

---

<a id="repository-structure"></a>

# 📁 Repository Structure

| Folder / File | Description |
|---------------|-------------|
| `src/` | Main application source code |
| `controllers/` | Business logic for authentication and address APIs |
| `middleware/` | JWT authentication middleware |
| `models/` | Database models |
| `routes/` | Express API routes |
| `app.js` | Main application entry point |
| `db.js` | MySQL database configuration |
| `Dockerfile` | Docker image definition |
| `Jenkinsfile` | CI/CD pipeline configuration |
| `package.json` | Project dependencies and scripts |

---

<a id="deployment-flow"></a>

# 🚀 Deployment Flow

```text
Developer
      │
Git Push
      ▼
GitHub Repository
      │
Webhook
      ▼
Jenkins
      │
Docker Build
      ▼
Amazon ECR
      │
Create New ECS Task Revision
      ▼
Amazon ECS Service Update
      ▼
Amazon ECS Fargate
      │
REST API
      ▼
Amazon RDS MySQL
```

---

<a id="getting-started"></a>

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/rozanaim2026/user-service.git

cd user-service
```

---

## Install Dependencies

```bash
npm install
```

---

## Start the Application

```bash
npm start
```

The User Service starts on:

```text
http://localhost:4000
```

---

<a id="future-improvements"></a>

# 📈 Future Improvements

- Refresh Token Authentication
- Role-Based Access Control (RBAC)
- Email Verification
- Password Reset via Email
- Multi-Factor Authentication (MFA)
- OAuth Login (Google/GitHub)
- API Documentation using Swagger
- Unit & Integration Testing
- Centralized Logging
- Health Check Endpoints

---

<a id="author"></a>

# 👩‍💻 Author

<div align="center">

## Rozana IM

Cloud Engineer • DevOps Engineer • AWS Enthusiast

GitHub: https://github.com/rozanaim2026

LinkedIn: https://www.linkedin.com/in/rozana-im-a63541302/

</div>

---

# ⭐ Support

If you found this project helpful,

please consider giving it a ⭐ on GitHub.

It really helps and motivates me to build more cloud-native projects.

---

<div align="center">

## ☁️ Built with Node.js • Express • Docker • Amazon ECS • Amazon ECR • Amazon RDS • Jenkins

### ❤️ Part of the LUCCI Cloud Native E-Commerce Platform

</div>
