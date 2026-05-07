# Advanced MERN Authentication

A full-stack authentication system built with the **MERN stack** — featuring secure JWT-based login, email verification, password reset, and bcrypt hashing. Designed with a clean separation between frontend and backend.

![TypeScript](https://img.shields.io/badge/TypeScript-95%25-3178C6?style=flat-square&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-Backend-000000?style=flat-square&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?style=flat-square&logo=node.js&logoColor=white)

---

## Features

- User registration & login
- Password hashing with **bcrypt**
- **JWT-based** authentication & authorization
- **Email verification** for new accounts
- **Password reset** via secure email token
- Protected routes on both frontend and backend

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React, TypeScript, Tailwind CSS |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | MongoDB (Mongoose ODM) |
| **Auth** | JWT, bcrypt |
| **Email** | Nodemailer (SMTP) |

---

## Getting Started

### Prerequisites

- Node.js `>= 18`
- MongoDB Atlas account (or local MongoDB)
- Gmail account (or any SMTP provider) for Nodemailer

### 1. Clone the repo

```bash
git clone https://github.com/nirmalravidas/advanced-mern-authentication.git
cd advanced-mern-authentication
```

### 2. Setup environment variables

Create a `.env` file inside the `backend/` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=8080
SECRET_KEY=your_jwt_secret_key
NODE_ENV=development
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER= email address
SMTP_PASSWORD= password
SENDER_EMAIL= sender email
SENDER_NAME= sender name
FRONTEND_URL=

```

> **Note:** For Gmail, use an [App Password](https://myaccount.google.com/apppasswords) instead of your actual password (requires 2FA enabled).

### 3. Install dependencies

```bash
# Install root + backend
yarn install

# Install frontend
cd frontend && yarn install
```

### 4. Run the app

```bash
# Run backend (from root)
yarn dev

```

Backend runs on `http://localhost:8000`  
Frontend runs on `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/user/check-auth` | Check if user is authenticated |
| `POST` | `/api/v1/user/signup` | Register a new user |
| `POST` | `/api/v1/user/login` | Login with email & password |
| `POST` | `/api/v1/user/logout` | Logout user |
| `POST` | `/api/v1/user/verify-email` | Verify email with OTP/token |
| `POST` | `/api/v1/user/forgot-password` | Send password reset email |
| `POST` | `/api/v1/user/reset-password/:token` | Reset password using token |
| `PUT` | `/api/v1/user/profile/update` | Update user profile |
 
---

## Auth Flow

```
Register → Email Verification → Login → JWT issued → Access Protected Routes
                                              ↓
                               Forgot Password → Reset Link via Email → New Password
```

---

## Build for Production

```bash
yarn build
```

This installs all dependencies and builds the frontend for production serving.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## License

This project is open source. Feel free to use it as a starter for your own projects.

---