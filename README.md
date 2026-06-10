# 🚀 SnipLink

<div align="center">

### *A backend-focused URL shortener built to explore real-world backend engineering concepts.*

Create, manage, and share shortened URLs with authentication, rate limiting, Redis, BullMQ scheduled jobs, and PostgreSQL persistence.

<br/>

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge\&logo=next.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-316192?style=for-the-badge\&logo=postgresql\&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-Rate_Limiting-DC382D?style=for-the-badge\&logo=redis\&logoColor=white)
![BullMQ](https://img.shields.io/badge/BullMQ-Scheduled_Jobs-orange?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge\&logo=jsonwebtokens)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge\&logo=docker\&logoColor=white)

</div>

---

## 🌌 Overview

**SnipLink** is a backend-focused URL shortener built to learn and implement real-world backend development concepts.

The project goes beyond simple URL shortening by incorporating:

* JWT Authentication
* PostgreSQL Persistence
* Redis-Powered Rate Limiting
* BullMQ Scheduled Jobs
* Soft Delete Architecture
* Automated Cleanup Workflows
* Dockerized Local Development

---

## 📸 Screenshots

![Dashboard Screenshot]()

![Create URL Screenshot]()

## ✨ Features

### 🔗 URL Management

* Create shortened URLs
* Redirect using unique short codes
* Track click counts
* Soft delete URLs
* Scheduled cleanup of expired soft-deleted URLs

### 🔐 Authentication

* JWT Authentication
* HTTP-only cookies
* Protected dashboard routes
* User-owned URLs

### ⚡ Infrastructure

* Redis-powered rate limiting
* BullMQ scheduled jobs
* PostgreSQL persistence
* Dockerized services

### 📊 Dashboard

* View created URLs
* Track click counts
* Manage active URLs
* Soft delete URLs

---

## 🖥 Tech Stack

### Backend

* Next.js 15 (App Router)
* PostgreSQL
* Redis
* BullMQ

### Authentication

* JWT
* bcrypt
* HTTP-only Cookies

### Infrastructure

* Docker
* Docker Compose

### Frontend

* Tailwind CSS
* shadcn/ui
* Lucide Icons

---

## 🧠 Backend Concepts Implemented

* Authentication & Authorization
* Database Schema Design
* Foreign Keys & Relationships
* SQL Transactions
* Redis Fundamentals
* Rate Limiting
* Scheduled Jobs
* Soft Delete Architecture
* Dockerized Development
