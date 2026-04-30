🚀 HireFlow – Smart Job Portal

A full-stack job portal application designed to connect job seekers with recruiters through a streamlined and modern platform.

📌 Overview

HireFlow allows users to explore job opportunities, apply to positions, and track their application status in real-time. It also provides a structured system for managing job listings and user interactions.

This project demonstrates full-stack development skills including authentication, API integration, and responsive UI design.

✨ Features
🔐 User Authentication (Login/Register)
🧑‍💼 Role-based Access (User/Admin)
📄 Browse Job Listings
📌 Apply to Jobs
📊 Track Application Status
(Applied → Reviewing → Shortlisted → Rejected)
⭐ Save/Bookmark Jobs
📊 Dashboard with application overview
⚡ Responsive UI (Mobile + Desktop)
🛠️ Tech Stack
Frontend
Next.js (App Router)
React
Tailwind CSS
Backend
Node.js
Express.js
Database
MongoDB (Mongoose)
Authentication
NextAuth.js (JWT-based)
📁 Project Structure
# HIREFLOW/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── utils/
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/Vibhanshu2004-hash/HIREFLOW.git
cd HIREFLOW
2️⃣ Install dependencies
Frontend
cd frontend
npm install
Backend
cd backend
npm install
3️⃣ Setup environment variables

Create .env file in both frontend and backend:

Backend .env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Frontend .env.local
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
4️⃣ Run the project
Start Backend
cd backend
npm run dev
Start Frontend
cd frontend
npm run dev
