# HireFlow Backend

Node.js, Express, and MongoDB API for the HireFlow job portal.

## Features

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Role-based access for `user` and `admin`
- Admin-only job creation
- Public job listing
- Authenticated job applications
- Application tracking for users and admins

## Folder Structure

```text
backend/
  src/
    config/
      db.js
    controllers/
      applicationController.js
      authController.js
      jobController.js
    middleware/
      authMiddleware.js
      errorMiddleware.js
    models/
      Application.js
      Job.js
      User.js
    routes/
      applicationRoutes.js
      authRoutes.js
      jobRoutes.js
    utils/
      asyncHandler.js
      generateToken.js
    app.js
    server.js
  .env.example
  package.json
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env`:

```bash
cp .env.example .env
```

3. Update `.env`:

```text
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hireflow
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
ADMIN_REGISTRATION_SECRET=change-me-admin-secret
```

4. Start MongoDB locally, then run:

```bash
npm run dev
```

API health check:

```text
GET http://localhost:5000/api/health
```

## API Endpoints

### Auth

Register a user:

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Alex Morgan",
  "email": "alex@example.com",
  "password": "secret123"
}
```

Register an admin:

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "secret123",
  "role": "admin",
  "adminSecret": "change-me-admin-secret"
}
```

Login:

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "alex@example.com",
  "password": "secret123"
}
```

Auth responses:

```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "Alex Morgan",
    "email": "alex@example.com",
    "role": "user"
  }
}
```

### Jobs

Create a job, admin only:

```http
POST /api/jobs
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "Frontend Engineer",
  "company": "Acme",
  "description": "Build polished hiring workflows.",
  "location": "Remote"
}
```

List all jobs:

```http
GET /api/jobs
```

### Applications

Apply to a job:

```http
POST /api/apply
Authorization: Bearer <token>
Content-Type: application/json

{
  "jobId": "job-id"
}
```

Get applications:

```http
GET /api/applications
Authorization: Bearer <token>
```

Users receive only their own applications. Admins receive all applications.

Application statuses:

```text
applied
shortlisted
rejected
```
