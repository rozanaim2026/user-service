<div align="center">

# 👤 LUCCI User Service (Free-Tier Deployment)

### Authentication & User Management Microservice for the LUCCI Cloud Native E-Commerce Platform

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)
[![Aiven](https://img.shields.io/badge/Aiven-FF3D00?style=for-the-badge&logo=aiven&logoColor=white)](https://aiven.io/)

<br/>

> Built using **Node.js + Express.js + PostgreSQL**

> Containerized using **Docker**, deployed to **Render** (free tier)

> Database hosted on **Aiven PostgreSQL** (free tier)

> Provides secure authentication and user management for the LUCCI platform.

<br/>

### 🔗 [Live Application](https://frontend-aws-devops-1.vercel.app)

This service powers part of the live LUCCI application above — see the link for the full working demo.

</div>

---

# 📑 Table of Contents

- [Overview](#overview)
- [Why a Free-Tier Branch](#why-a-free-tier-branch)
- [Project Structure](#project-structure)
- [Service Responsibilities](#service-responsibilities)
- [Project Repositories](#project-repositories)
- [Architecture](#architecture)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Authentication Flow](#authentication-flow)
- [Security Features](#security-features)
- [Tech Stack](#tech-stack)
- [Database Configuration](#database-configuration)
- [Docker Configuration](#docker-configuration)
- [Deployment Flow](#deployment-flow)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

<a id="overview"></a>
# 🔍 Overview

The User Service is a backend microservice responsible for authentication, authorization, user profile management, and address management within the LUCCI Cloud Native E-Commerce Platform.

It exposes REST APIs that allow users to register, log in securely using JWT authentication, manage their profile information, and maintain shipping addresses.

This branch (`free-tier-deploy`) runs the service as a Docker container on **Render's free web service tier**, backed by a **PostgreSQL database on Aiven** instead of Amazon RDS MySQL.

---

<a id="why-a-free-tier-branch"></a>
# 💡 Why a Free-Tier Branch

The `main` branch documents the original AWS-based deployment (ECS Fargate, ECR, RDS MySQL). This branch is a parallel implementation migrated to run entirely on free-tier services, since MySQL is not available on Aiven's free plan — the database layer was ported from MySQL to PostgreSQL, with a compatibility adapter in `db.js` that keeps controller code MySQL-syntax-compatible (`?` placeholders, `insertId`, `affectedRows`).

---
<a id="project-structure"></a>

# 📁 Project Structure
```
src/
│
├── controllers/
│     ├── auth.controller.js
│     └── addressController.js
│
├── middleware/
│     └── auth.middleware.js
│
├── routes/
│     └── auth.routes.js
│
├── app.js
└── db.js              (Postgres adapter — mysql2-compatible interface)

Dockerfile
package.json
README.md
```
---

<a id="service-responsibilities"></a>
# 🌐 Service Responsibilities

- User Registration
- User Authentication
- JWT Access & Refresh Token Generation
- User Authorization
- Address Management
- Admin User Operations
- Aiven PostgreSQL Communication

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

# Architecture
```text
Client (Vercel-hosted frontend)
   │
User Service (Render Web Service, Docker)
   │
JWT Authentication
   │
Aiven PostgreSQL
```

### Request Flow

1. The frontend sends authentication requests directly to this service's Render URL.
2. Render routes the request into the running Docker container.
3. The service validates requests using JWT authentication middleware.
4. User information is securely stored and retrieved from Aiven PostgreSQL over an SSL connection.
5. JSON responses are returned to the frontend.

---
<a id="features"></a>

# ✨ Features

- User Registration & Login
- JWT Access Token Authentication (15 min expiry)
- Long-lived Refresh Token (extended to persist login across sessions)
- Password Encryption using bcrypt
- Role-Based Access Control (user/admin)
- User Address Management
- Admin User Management
- Aiven PostgreSQL Integration (SSL)
- RESTful API Design
- Docker Containerization
- Render Free-Tier Deployment

----

<a id="api-endpoints"></a>
# 🔗 API Endpoints

## Authentication

| Method | Endpoint | Description | Authentication |
|---------|----------|-------------|----------------|
| POST | `/users/register` | Register a new user | ❌ |
| POST | `/users/login` | Authenticate a user | ❌ |
| POST | `/users/auth/refresh` | Generate a new access token using a refresh token | ❌ |

## Address Management

| Method | Endpoint | Description | Authentication |
|---------|----------|-------------|----------------|
| POST | `/users/addresses` | Save a new delivery address | ✅ JWT |
| GET | `/users/addresses` | Retrieve all saved addresses | ✅ JWT |
| DELETE | `/users/addresses/:id` | Delete an address | ✅ JWT |

## Admin

| Method | Endpoint | Description | Authentication |
|---------|----------|-------------|----------------|
| GET | `/users/all` | Retrieve all registered users | ✅ Admin |

## Health Check

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/health` | Service health status |

## Authentication Header

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
User Service (Render)
   │
Verify Password (bcrypt)
   │
Aiven PostgreSQL
   │
Generate JWT Access Token
   │
Generate Refresh Token
   │
Return Tokens
```

---
<a id="security-features"></a>

# 🔒 Security Features

- JWT Access Token Authentication
- Refresh Token Authentication
- Password Hashing using bcrypt
- Role-based Authorization (Admin/User)
- Protected Routes using Middleware
- CORS restricted to the deployed frontend origin (`FRONTEND_URL`)
- Environment Variable Configuration
- Parameterized Queries (SQL Injection Protection)
- SSL-secured PostgreSQL connection

---
<a id="tech-stack"></a>

# Tech Stack
| Category | Technology | Purpose |
|-----------|------------|---------|
| Runtime | Node.js | JavaScript Runtime |
| Framework | Express.js | REST API Development |
| Database | Aiven PostgreSQL | Persistent Data Storage |
| Authentication | JWT | User Authentication |
| Password Security | bcrypt | Password Hashing |
| Containerization | Docker | Application Packaging |
| Hosting | Render (Free Tier) | Container Deployment |
| Version Control | Git & GitHub | Source Code Management |

---
<a id="database-configuration"></a>

# Database Configuration
The service connects to a single shared **Aiven PostgreSQL** instance using the `pg` package with connection pooling and SSL enabled (`ssl: { rejectUnauthorized: false }`).

A compatibility layer in `db.js` converts MySQL-style `?` placeholders to PostgreSQL's `$1, $2...` syntax on the fly, and auto-appends `RETURNING id` to `INSERT` statements so `result.insertId` continues to work exactly as it did against MySQL — meaning controller code required **zero changes** during the migration.

Tables owned by this service:
- `users`
- `user_addresses`

---

<a id="docker-configuration"></a>

# 🐳 Docker Configuration

## Build Docker Image

```bash
docker build -t user-service .
```

## Run Docker Container

```bash
docker run -p 4000:4000 user-service
```

Render builds and runs this same Dockerfile automatically on deploy.

 ---

<a id="deployment-flow"></a>

# 🚀 Deployment Flow

```text
Developer
      │
Git Push (free-tier-deploy branch)
      ▼
GitHub Repository
      │
Render (Docker build & deploy)
      ▼
Running Container
      │
REST API
      ▼
Aiven PostgreSQL
```

Render deploys are triggered manually via "Manual Deploy" in the Render dashboard for this project (connected via public repository URL rather than GitHub OAuth).

---

<a id="getting-started"></a>
# 🚀 Getting Started

## Clone Repository

```bash
git clone -b free-tier-deploy https://github.com/rozanaim2026/user-service.git
cd user-service
```

## Install Dependencies

```bash
npm install
```

## Start the Application

```bash
npm start
```

The User Service starts on:

```text
http://localhost:4000
```

---

<a id="environment-variables"></a>
# Environment Variables
| Variable | Description |
|----------|-------------|
| `DB_HOST` | Aiven PostgreSQL host |
| `DB_USER` | Database user (`avnadmin`) |
| `DB_PASSWORD` | Database password |
| `DB_NAME` | Database name (`defaultdb`) |
| `DB_PORT` | Aiven's custom Postgres port |
| `JWT_SECRET` | Secret used to sign JWTs — shared across all 4 services |
| `FRONTEND_URL` | Deployed Vercel frontend URL (for CORS) |
| `PORT` | Injected automatically by Render |

---

<a id="future-improvements"></a>
# 📈 Future Improvements

- Role-Based Access Control (RBAC) expansion
- Email Verification
- Password Reset via Email
- Multi-Factor Authentication (MFA)
- OAuth Login (Google/GitHub)
- API Documentation using Swagger
- Unit & Integration Testing
- Centralized Logging

---

<a id="author"></a>
# Author
<div align="center">

## Rozana IM

Cloud Engineer • DevOps Engineer • AWS Enthusiast

GitHub: https://github.com/rozanaim2026

LinkedIn: https://www.linkedin.com/in/rozana-im-a63541302/

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.

---

## ☁️ Built with Node.js • Express • Docker • Render • Aiven PostgreSQL

### ❤️ Part of the LUCCI Cloud Native E-Commerce Platform (Free-Tier Edition)

</div>
