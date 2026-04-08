-- Create database
CREATE DATABASE bunna_bank;

-- Connect to database
\c bunna_bank;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('officer', 'teller', 'supervisor')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster username lookup
CREATE INDEX idx_users_username ON users(username);

-- Insert a test user (password: Admin@123)
INSERT INTO users (full_name, username, password, role) 
VALUES (
    'Admin User',
    'admin',
    '$2a$10$rQKjQkL9YxQ5YxQ5YxQ5YuQ5YxQ5YxQ5YxQ5YxQ5YxQ5YxQ5YxQ5Y',
    'supervisor'
);

-- Optional: Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();