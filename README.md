# Bank Customer 360 Dashboard

A read-only internal bank portal to quickly look up customer data from Oracle DB.

## Stack
- **Frontend**: React 18, React Router v6
- **Backend**: Node.js, Express, oracledb (Thin mode)
- **Database**: Oracle DB

## Setup

### 1. Oracle Database
Run `server/db/schema.sql` in your Oracle SQL Developer to create the tables.

### 2. Backend
```bash
cd server
npm install
# Edit .env with your Oracle credentials
npm run dev
```

### 3. Frontend
```bash
cd client
npm install
npm start
```

## Environment Variables (`server/.env`)
```
PORT=5000
JWT_SECRET=change_this_to_a_long_random_string
DB_USER=your_oracle_user
DB_PASSWORD=your_oracle_password
DB_CONNECT_STRING=localhost:1521/ORCL
```

## Features
- Login / Register for bank staff
- Search customer by Account Number or Phone Number
- View profile photo, signature, balance, account status
- View last 20 transactions per account
- JWT-secured API — read-only, no write operations
