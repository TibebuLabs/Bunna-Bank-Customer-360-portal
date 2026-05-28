const jwt = require('jsonwebtoken');

// CORS headers for all responses
const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

// Handle preflight OPTIONS requests
function handleCors(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, cors);
    res.end();
    return true;
  }
  return false;
}

// Set CORS headers on response
function setCors(res) {
  Object.entries(cors).forEach(([k, v]) => res.setHeader(k, v));
}

// Verify JWT and return decoded user, or null
function verifyToken(req) {
  try {
    const header = req.headers['authorization'] || '';
    const token = header.split(' ')[1];
    if (!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
  } catch {
    return null;
  }
}

// Generate JWT
function generateToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET || 'fallback_secret',
    { expiresIn: '8h' }
  );
}

module.exports = { handleCors, setCors, verifyToken, generateToken };
