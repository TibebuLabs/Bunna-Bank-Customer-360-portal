const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET || 'fallback_secret',
    { expiresIn: process.env.JWT_EXPIRE || '8h' }
  );
};

// POST /api/auth/register
const register = async (req, res) => {
  try {
    // Log incoming body for debugging
    console.log('Register body:', req.body);

    const { fullName, username, password, role } = req.body;

    const errors = [];

    // Validate fullName
    if (!fullName || String(fullName).trim().length < 2) {
      errors.push('Full name must be at least 2 characters');
    }

    // Validate username — check length first, then format
    if (!username || String(username).trim().length < 3) {
      errors.push('Username must be at least 3 characters');
    } else if (!/^[a-zA-Z0-9_]+$/.test(String(username).trim())) {
      errors.push('Username can only contain letters, numbers, and underscores');
    }

    // Validate password
    if (!password || String(password).length < 6) {
      errors.push('Password must be at least 6 characters');
    }

    // Validate role only if provided
    if (role && !['officer', 'teller', 'supervisor'].includes(role)) {
      errors.push('Invalid role. Must be officer, teller, or supervisor');
    }

    if (errors.length > 0) {
      console.log('Validation errors:', errors);
      return res.status(400).json({ message: errors[0], errors });
    }

    // Check duplicate username
    const existing = await User.findByUsername(String(username).trim());
    if (existing) {
      return res.status(400).json({ message: 'Username already exists. Please choose another.' });
    }

    const newUser = await User.create({
      fullName: String(fullName).trim(),
      username: String(username).trim(),
      password: String(password),
      role: role || 'officer',
    });

    const token = generateToken(newUser);

    console.log('User registered:', newUser.username);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        fullName: newUser.full_name,
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed: ' + error.message });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    console.log('Login attempt:', req.body?.username);

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await User.findByUsername(String(username).trim());
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.is_active) {
      return res.status(401).json({ message: 'Account is deactivated. Contact administrator.' });
    }

    const valid = await User.verifyPassword(String(password), user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    console.log('Login success:', user.username);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        username: user.username,
        role: user.role,
        isActive: user.is_active,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed: ' + error.message });
  }
};

// GET /api/auth/me
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      user: {
        id: user.id,
        fullName: user.full_name,
        username: user.username,
        role: user.role,
        isActive: user.is_active,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { register, login, getCurrentUser };
