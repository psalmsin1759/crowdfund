# Crowdfundr 🪙

**Crowdfundr** is a modular and scalable crowdfunding platform built using Nodejs, following a microservices architecture. The system allows users to create campaigns, pledge funds, and receive notifications — all handled by independently deployed services.

---

## 📦 Architecture Overview

Crowdfundr is designed with **ExpressJS microservices**, using **RabbitMQ** as the message broker for inter-service communication.

### 🧱 Services

- **User Service** – Manages registration, login, profile, and authentication
- **Project Service** – Handles campaign creation, listing, funding logic
- **Payment Service** – Manages fund pledges and transactions
- **Notification Service** – Sends emails, SMS and Push notifications
- **Gateway API** – Public-facing API gateway for routing and authentication

---

## 🛠 Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| Backend     | ExpressJS                     |
| Communication | RabbitMQ (Microservices)    |
| Auth        | JWT                           |
| Mail        | Nodemailer, Mailtrap          |
| DBs         | MongoDB                       |
| DevOps      | Docker, Docker Compose, Github Actions |

---

## 🗂️ Folder Structure

