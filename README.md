# Task Management App (MERN Stack)

A full-stack task management application with user authentication, CRUD operations, search, filter, pagination, and due date reminders.

## Tech Stack

- **Frontend:** React 18, React Router, Context API, Axios, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Auth:** JWT (jsonwebtoken), bcryptjs

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas connection string)

## Setup

### 1. Backend

```bash
cd backend
npm install
```

Create `.env` (or use the provided one) with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-secret-key
```

Start the server:
```bash
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Open the app

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Features

- **Auth:** Register and login with JWT
- **Dashboard:** View all tasks with search and status filter
- **Tasks:** Add, edit, delete tasks (title, description, due date, status)
- **Pagination:** 10 tasks per page
- **Reminders:** Toast notifications for tasks due within 24 hours
- **Responsive:** Works on mobile and desktop

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Get current user (protected) |
| GET | /api/tasks | List tasks (search, status, pagination) |
| POST | /api/tasks | Create task |
| GET | /api/tasks/:id | Get task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |
