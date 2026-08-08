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

# 📑 Table of Contents

- [Overview](#overview)
- [Service Responsibilities](#service-responsibilities)
- [Project Repositories](#project-repositories)
- [Architecture](#architecture)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Authentication Flow](#authentication-flow)
- [Security Features](#security-features)
- [Tech Stack](#tech-stack)
- [AWS Infrastructure](#aws-infrastructure)
- [CI/CD Pipeline](#cicd-pipeline)
- [Project Structure](#project-structure)
- [Docker Configuration](#docker-configuration)
- [Deployment Flow](#deployment-flow)
- [Application Screenshots](#application-screenshots)
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
# 🌐 Service Responsibilities

The User Service is responsible for:

- User Registration
- User Authentication
- JWT Token Generation
- Refresh Token Management
- User Authorization
- Address Management
- Admin User Operations
- Amazon RDS Database Communication

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
Client
   │
Application Load Balancer
   │
User Service (Amazon ECS)
   │
JWT Authentication
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
- User Login Authentication
- JWT Access Token Authentication
- Refresh Token Support
- Password Encryption using bcrypt
- Role-Based Access Control
- User Address Management
- Admin User Management
- Amazon RDS MySQL Integration
- RESTful API Design
- Docker Containerization
- Amazon ECS Fargate Deployment
- Amazon ECR Image Repository
- Jenkins CI/CD Pipeline

----

<a id="api-endpoints"></a>

# 🔗 API Endpoints

The User Service exposes RESTful APIs for user authentication, JWT-based authorization, user address management, and administrative user operations.

## Authentication

| Method | Endpoint | Description | Authentication |
|---------|----------|-------------|----------------|
| POST | `/users/register` | Register a new user | ❌ |
| POST | `/users/login` | Authenticate a user | ❌ |
| POST | `/users/auth/refresh` | Generate a new access token using a refresh token | ❌ |

---

## Address Management

| Method | Endpoint | Description | Authentication |
|---------|----------|-------------|----------------|
| POST | `/users/addresses` | Save a new delivery address | ✅ JWT |
| GET | `/users/addresses` | Retrieve all saved addresses | ✅ JWT |
| DELETE | `/users/addresses/:id` | Delete an address | ✅ JWT |

---

## Admin

| Method | Endpoint | Description | Authentication |
|---------|----------|-------------|----------------|
| GET | `/users/all` | Retrieve all registered users | ✅ Admin |

---

## Health Check

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/health` | Service health status |

---

## Authentication Header

Protected endpoints require a valid JWT access token.

```http
Authorization: Bearer <your_jwt_access_token>
```

---
<a id="authentication-flow"></a>

# 🔐 Authentication Flow

```
User
   │
Login Request
   │
Application Load Balancer
   │
User Service
   │
Verify Password (bcrypt)
   │
Amazon RDS MySQL
   │
Generate JWT Access Token
   │
Generate Refresh Token
   │
Return Tokens
```

The service authenticates users using email and password, securely hashes passwords with bcrypt, generates JWT access tokens, and issues refresh tokens for session management.

---
<a id="security-features"></a>

# 🔒 Security Features

The User Service implements several security mechanisms to protect user data and authenticated endpoints.

- JWT Access Token Authentication
- Refresh Token Authentication
- Password Hashing using bcrypt
- Role-based Authorization (Admin/User)
- Protected Routes using Middleware
- Secure CORS Configuration
- Environment Variable Configuration
- MySQL Parameterized Queries (SQL Injection Protection)
- Authentication Middleware for API Protection

---
<a id="tech-stack"></a>

# 🛠️ Tech Stack

| Category | Technology | Purpose |
|-----------|------------|---------|
| Runtime | Node.js | JavaScript Runtime |
| Framework | Express.js | REST API Development |
| Database | Amazon RDS MySQL | Persistent Data Storage |
| Authentication | JWT | User Authentication |
| Password Security | bcrypt | Password Hashing |
| Containerization | Docker | Application Packaging |
| Container Registry | Amazon ECR | Docker Image Repository |
| Container Orchestration | Amazon ECS Fargate | Container Deployment |
| CI/CD | Jenkins | Automated Build & Deployment |
| Cloud Platform | AWS | Cloud Infrastructure |
| Version Control | Git & GitHub | Source Code Management |

---
<a id="aws-infrastructure"></a>

# ☁️ AWS Infrastructure

The User Service is deployed as a Docker container on Amazon ECS Fargate and securely communicates with Amazon RDS MySQL. The service is exposed through an Application Load Balancer and automatically deployed using Jenkins.

| AWS Service | Purpose |
|--------------|---------|
| Amazon ECS Fargate | Hosts the User Service container |
| Amazon ECR | Stores Docker images |
| Amazon RDS MySQL | User and Address Database |
| Application Load Balancer | Routes incoming API requests |
| Amazon VPC | Secure networking environment |
| Security Groups | Control inbound and outbound traffic |
| IAM | Secure access between AWS services |

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
Jenkins
     │
Checkout Source
     │
Login to Amazon ECR
     │
Docker Build
     │
Push Image to Amazon ECR
     │
Create New ECS Task Definition
     │
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

<a id="project-structure"></a>

# 📁 Project Structure

src/
│
├── controllers/
│     ├── auth.controller.js
│     └── addressController.js
│
├── middleware/
│     └── auth.middleware.js
│
├── models/
│     └── addressModel.js
│
├── routes/
│     └── auth.routes.js
│
├── app.js
└── db.js

Dockerfile
Jenkinsfile
package.json
README.md

---

<a id="docker-configuration"></a>

# 🐳 Docker Configuration

The User Service is containerized using Docker, enabling consistent deployments across development, testing, and production environments.

## Dockerfile Overview

| Step | Description |
|------|-------------|
| Base Image | Node.js 18 Alpine |
| Working Directory | `/app` |
| Dependency Installation | `npm install --production` |
| Application Source | Copied into the container |
| Exposed Port | `4000` |
| Startup Command | `node src/app.js` |

---

## Build Docker Image

```bash
docker build -t user-service .
```

---

## Run Docker Container

```bash
docker run -p 4000:4000 user-service
```

---

The containerized application is deployed to **Amazon ECS Fargate** through the Jenkins CI/CD pipeline after being pushed to **Amazon ECR**.

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

<a id="application-screenshots"></a>

# 📸 Application Screenshots

## 🔐 Login Page

<p align="center">
  <img src="./assets/LoginPage.png" width="90%">
</p>

---

## 👤 User Login

<p align="center">
  <img src="./assets/Login1.png" width="90%">
</p>

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
