const bcrypt = require('bcryptjs');
const { getPool } = require('../_db');
const { handleCors, setCors, generateToken } = require('../_helpers');

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;
  setCors(res);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { fullName, username, password, role } = req.body;

    // Validate
    const errors = [];
    if (!fullName || String(fullName).trim().length < 2)
      errors.push('Full name must be at least 2 characters');
    if (!username || String(username).trim().length < 3)
      errors.push('Username must be at least 3 characters');
    else if (!/^[a-zA-Z0-9_]+$/.test(String(username).trim()))
      errors.push('Username can only contain letters, numbers, and underscores');
    if (!password || String(password).length < 6)
      errors.push('Password must be at least 6 characters');
    if (role && !['officer', 'teller', 'supervisor'].includes(role))
      errors.push('Invalid role');

    if (errors.length > 0) {
      return res.status(400).json({ message: errors[0], errors });
    }

    const pool = getPool();

    // Check duplicate
    const existing = await pool.query('SELECT id FROM users WHERE username = $1', [username.trim()]);
    if (existing.rows[0]) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashed = await bcrypt.hash(String(password), 10);
    const result = await pool.query(
      `INSERT INTO users (full_name, username, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, full_name, username, role`,
      [fullName.trim(), username.trim(), hashed, role || 'officer']
    );

    const user = result.rows[0];
    const token = generateToken(user);

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, fullName: user.full_name, username: user.username, role: user.role },
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Registration failed: ' + err.message });
  }
};
