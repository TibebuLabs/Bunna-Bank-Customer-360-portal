const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    // Create new user
    static async create(userData) {
        const { fullName, username, password, role } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const query = `
            INSERT INTO users (full_name, username, password, role)
            VALUES ($1, $2, $3, $4)
            RETURNING id, full_name, username, role, is_active, created_at
        `;
        
        const values = [fullName, username, hashedPassword, role];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
    
    // Find user by username
    static async findByUsername(username) {
        const query = 'SELECT * FROM users WHERE username = $1';
        const result = await pool.query(query, [username]);
        return result.rows[0];
    }
    
    // Find user by ID
    static async findById(id) {
        const query = `
            SELECT id, full_name, username, role, is_active, created_at, updated_at 
            FROM users WHERE id = $1
        `;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
    
    // Verify password
    static async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
    
    // Update user status
    static async updateStatus(id, isActive) {
        const query = 'UPDATE users SET is_active = $1 WHERE id = $2 RETURNING *';
        const result = await pool.query(query, [isActive, id]);
        return result.rows[0];
    }
}

module.exports = User;