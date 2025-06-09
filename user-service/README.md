#  User Service – Crowdfunding Platform

The **User Service** is a microservice responsible for handling user registration, login, authentication, profile management, and password recovery in the crowdfunding system.

---

## 🚀 Features

- Register / Login / Logout
- JWT Authentication
- Profile Update & Fetch
- Password Reset
- OTP Verification 
- MongoDB integration

---

## 🏗 Tech Stack

- Node.js / Express
- MongoDB / Mongoose
- JWT Authentication
- Docker & Docker Compose
- RESTful API design

---

##  Installation

```bash
# Clone the repository
cd user-service

# Install dependencies
npm install

# Create .env file
cp .env.example .env

```

### 3. Example .env for the user service:
```bash
PORT=3001
JWT_SECRET=yoursecret
MONGODB_URI=mongodb://localhost:27017/crowdfund_user
RABBITMQ_URL=amqp://localhost:5672
```


### Documentation

```bash
http://localhost:4000/api-docs/
```

![System Design](/screenshoots/userdoc.png)