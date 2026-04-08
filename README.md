# Job Tracker

An interactive app to save, manage and check your job applications.

🔗 **Live Demo:** https://job-tracker-six-sigma.vercel.app/

---

## Tech Stack

**Backend:** Node.js, Express, Drizzle ORM, PostgreSQL (Neon), JWT  
**Frontend:** React, TypeScript, Tailwind CSS, Recharts  
**Deployment:** Render (backend), Vercel (frontend)

---

## Features

- Login / Register with JWT authentication
- Dashboard with application list, stats and charts
- Filter applications by status
- Create, edit and delete applications

---

## Run Locally

1. Clone the repository
2. Install dependencies in both folders:
```bash
   cd server && npm install
   cd client && npm install
```
3. Create a `.env` file in the `server` folder:
DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_secret
PORT=9000
4. Start the backend:
```bash
   cd server && npm run dev
```
5. Start the frontend:
```bash
   cd client && npm run dev
```