-- ============================================================
-- Bunna Bank Customer 360 Portal - PostgreSQL Schema
-- Run: psql -U postgres -d Customer360 -f database.sql
-- (Connect to your existing database first)
-- ============================================================

-- Users (bank staff)
CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  full_name  VARCHAR(100) NOT NULL,
  username   VARCHAR(50)  UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,
  role       VARCHAR(20)  NOT NULL DEFAULT 'officer' CHECK (role IN ('officer','teller','supervisor')),
  is_active  BOOLEAN      DEFAULT true,
  created_at TIMESTAMP    DEFAULT NOW(),
  updated_at TIMESTAMP    DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Customers
CREATE TABLE IF NOT EXISTS customers (
  id          SERIAL PRIMARY KEY,
  full_name   VARCHAR(100) NOT NULL,
  phone_no    VARCHAR(20)  UNIQUE,
  email       VARCHAR(100),
  national_id VARCHAR(50),
  address     VARCHAR(255),
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone_no);
CREATE INDEX IF NOT EXISTS idx_customers_name  ON customers(full_name);

-- Accounts
CREATE TABLE IF NOT EXISTS accounts (
  id             SERIAL PRIMARY KEY,
  customer_id    INT           NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  account_no     VARCHAR(20)   NOT NULL UNIQUE,
  account_type   VARCHAR(30)   DEFAULT 'SAVINGS' CHECK (account_type IN ('SAVINGS','CURRENT','LOAN','FIXED')),
  balance        NUMERIC(18,2) DEFAULT 0,
  account_status VARCHAR(20)   DEFAULT 'ACTIVE' CHECK (account_status IN ('ACTIVE','FROZEN','DORMANT','CLOSED')),
  branch_code    VARCHAR(10),
  open_date      DATE          DEFAULT CURRENT_DATE
);

CREATE INDEX IF NOT EXISTS idx_accounts_no          ON accounts(account_no);
CREATE INDEX IF NOT EXISTS idx_accounts_customer_id ON accounts(customer_id);

-- Transactions
CREATE TABLE IF NOT EXISTS transactions (
  id          SERIAL PRIMARY KEY,
  account_id  INT           NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  txn_date    TIMESTAMP     DEFAULT NOW(),
  txn_type    VARCHAR(10)   NOT NULL CHECK (txn_type IN ('CREDIT','DEBIT')),
  amount      NUMERIC(18,2) NOT NULL,
  description VARCHAR(255),
  channel     VARCHAR(30),
  status      VARCHAR(20)   DEFAULT 'SUCCESS'
);

CREATE INDEX IF NOT EXISTS idx_txn_account_id ON transactions(account_id);

-- Branches
CREATE TABLE IF NOT EXISTS branches (
  id           SERIAL PRIMARY KEY,
  sol_id       INT          UNIQUE NOT NULL,
  code         VARCHAR(20),
  name         VARCHAR(100) NOT NULL,
  amharic_name VARCHAR(100),
  phone        VARCHAR(30),
  manager      VARCHAR(100),
  manager_phone VARCHAR(20),
  district     VARCHAR(100),
  region       VARCHAR(50),
  location     VARCHAR(255),
  created_at   TIMESTAMP DEFAULT NOW()
);

-- ── Seed: default admin user (password: Admin@123) ──
INSERT INTO users (full_name, username, password, role) VALUES
  ('Admin User',   'admin',   '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LkdRe/ZdchC', 'supervisor'),
  ('Test Officer', 'officer', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LkdRe/ZdchC', 'officer')
ON CONFLICT (username) DO NOTHING;

-- ── Seed: sample customers ──
INSERT INTO customers (full_name, phone_no, email, national_id, address) VALUES
  ('Abebe Kebede',   '0911234567', 'abebe@email.com',   'ETH001', 'Addis Ababa, Bole'),
  ('Tigist Haile',   '0922345678', 'tigist@email.com',  'ETH002', 'Addis Ababa, Kirkos'),
  ('Dawit Tesfaye',  '0933456789', 'dawit@email.com',   'ETH003', 'Addis Ababa, Yeka'),
  ('Meron Alemu',    '0944567890', 'meron@email.com',   'ETH004', 'Addis Ababa, Nifas Silk'),
  ('Solomon Bekele', '0955678901', 'solomon@email.com', 'ETH005', 'Addis Ababa, Akaki')
ON CONFLICT DO NOTHING;

-- ── Seed: sample accounts ──
INSERT INTO accounts (customer_id, account_no, account_type, balance, account_status, branch_code) VALUES
  (1, '1000101001', 'SAVINGS',  45230.50, 'ACTIVE',  '101'),
  (1, '1000101002', 'CURRENT',  12000.00, 'ACTIVE',  '101'),
  (2, '1000102001', 'SAVINGS',  89500.75, 'ACTIVE',  '102'),
  (3, '1000103001', 'SAVINGS',   3200.00, 'FROZEN',  '103'),
  (4, '1000104001', 'CURRENT', 125000.00, 'ACTIVE',  '104'),
  (5, '1000105001', 'SAVINGS',      0.00, 'DORMANT', '105')
ON CONFLICT DO NOTHING;

-- ── Seed: sample transactions ──
INSERT INTO transactions (account_id, txn_date, txn_type, amount, description, channel, status) VALUES
  (1, NOW() - INTERVAL '1 day',  'CREDIT', 5000.00,  'Salary deposit',    'TRANSFER', 'SUCCESS'),
  (1, NOW() - INTERVAL '2 days', 'DEBIT',  1200.00,  'ATM withdrawal',    'ATM',      'SUCCESS'),
  (1, NOW() - INTERVAL '3 days', 'DEBIT',   500.00,  'Mobile payment',    'MOBILE',   'SUCCESS'),
  (1, NOW() - INTERVAL '5 days', 'CREDIT', 2000.00,  'Transfer received', 'ONLINE',   'SUCCESS'),
  (2, NOW() - INTERVAL '1 day',  'DEBIT',  3000.00,  'Cheque payment',    'BRANCH',   'SUCCESS'),
  (3, NOW() - INTERVAL '2 days', 'CREDIT',10000.00,  'Cash deposit',      'BRANCH',   'SUCCESS'),
  (4, NOW() - INTERVAL '1 day',  'CREDIT',50000.00,  'Business transfer', 'ONLINE',   'SUCCESS'),
  (4, NOW() - INTERVAL '3 days', 'DEBIT', 15000.00,  'Supplier payment',  'TRANSFER', 'SUCCESS')
ON CONFLICT DO NOTHING;

-- ── Seed: sample branches ──
INSERT INTO branches (sol_id, code, name, amharic_name, phone, manager, district, region, location) VALUES
  (101, 'ADDIS01', 'Bole Branch',       'ቦሌ ቅርንጫፍ',     '0115570101', 'Kebede Alemu',  'East A.A District',  'Addis Ababa', 'Bole Road'),
  (102, 'ADDIS02', 'Kirkos Branch',     'ቂርቆስ ቅርንጫፍ',   '0114701234', 'Tigist Bekele', 'South A.A District', 'Addis Ababa', 'Kirkos area'),
  (103, 'ADDIS03', 'Yeka Branch',       'የካ ቅርንጫፍ',      '0116345678', 'Dawit Haile',   'East A.A District',  'Addis Ababa', 'Yeka sub-city'),
  (201, 'BAHIR01', 'Bahir Dar Branch',  'ባህር ዳር ቅርንጫፍ',  '0582201234', 'Hana Mulugeta', 'Bahir Dar District', 'Amhara',      'Bahir Dar city center'),
  (202, 'HAWAS01', 'Hawassa Branch',    'ሐዋሳ ቅርንጫፍ',     '0462201234', 'Yonas Tadesse', 'Hawassa District',   'SNNPR',       'Hawassa city center')
ON CONFLICT DO NOTHING;
