# Bunna Bank Customer 360 Portal

Full-stack banking portal — React + Node.js + PostgreSQL.

## Project Structure

```
├── client/          React + Vite frontend
│   └── src/
│       ├── api/     axios instance (proxies /api → localhost:5000)
│       ├── pages/   Login, Register, Dashboard, ...
│       └── components/
└── server/          Node.js + Express backend
    └── src/
        ├── config/      PostgreSQL pool
        ├── controllers/ auth, customer
        ├── middleware/  JWT auth
        ├── models/      User, Customer
        ├── routes/      auth, customers, branches
        └── utils/       validation
```

## Setup

### 1. PostgreSQL

```bash
# Create DB and tables
psql -U postgres -f server/database.sql
```

### 2. Server

```bash
cd server
# Edit .env with your DB credentials
npm install
npm run dev        # runs on http://localhost:5000
```

### 3. Client

```bash
cd client
npm install
npm run dev        # runs on http://localhost:5173
```

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/auth/register | No | Register staff user |
| POST | /api/auth/login | No | Login, returns JWT |
| GET | /api/auth/me | Yes | Current user info |
| GET | /api/customers/search?q= | Yes | Search by name/phone/account |
| GET | /api/customers/summary | Yes | Dashboard stats |
| GET | /api/customers/:accountNo | Yes | Single customer |
| GET | /api/customers/:accountNo/transactions | Yes | Transactions |
| GET | /api/branches | Yes | All branches |
| GET | /api/branches/:solId | Yes | Single branch |

## Default Login

```
Username: admin
Password: Admin@123
```
