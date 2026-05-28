# Bunna Bank Customer 360 Portal

Full-stack banking portal — React + Vite frontend, Node.js serverless API, PostgreSQL (Neon).

## Deploy to Vercel

### 1. Create a free PostgreSQL database on Neon
- Go to https://neon.tech and create a free project
- Copy the **Connection String** (looks like `postgresql://user:pass@host/dbname?sslmode=require`)
- Run the schema: paste contents of `server/database.sql` in the Neon SQL editor

### 2. Deploy to Vercel
- Push this repo to GitHub
- Go to https://vercel.com → New Project → Import your repo
- Set **Root Directory** to `.` (the repo root)
- Add these **Environment Variables** in Vercel dashboard:
  ```
  DATABASE_URL=postgresql://user:pass@host/dbname?sslmode=require
  JWT_SECRET=your_strong_secret_here
  NODE_ENV=production
  ```
- Click Deploy

### 3. Local Development
```bash
# Install root API dependencies
npm install

# Start backend (Express server)
cd server && npm install && npm run dev

# Start frontend (new terminal)
cd client && npm install && npm run dev
```

## Project Structure
```
├── api/                    ← Vercel serverless functions
│   ├── _db.js              ← PostgreSQL pool
│   ├── _helpers.js         ← JWT, CORS helpers
│   ├── auth/
│   │   ├── login.js        ← POST /api/auth/login
│   │   ├── register.js     ← POST /api/auth/register
│   │   └── me.js           ← GET /api/auth/me
│   ├── customers/
│   │   ├── search.js       ← GET /api/customers/search?q=
│   │   ├── [accountNo].js  ← GET /api/customers/:accountNo
│   │   └── transactions.js ← GET /api/customers/transactions?accountNo=
│   ├── branches/
│   │   └── index.js        ← GET /api/branches
│   └── health.js           ← GET /api/health
├── client/                 ← React + Vite frontend
│   └── src/
├── server/                 ← Local Express server (dev only)
├── vercel.json             ← Vercel config
└── package.json            ← Root deps for serverless functions
```

## Default Login
```
Username: admin
Password: Admin@123
```
