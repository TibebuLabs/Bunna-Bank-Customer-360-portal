const { getPool } = require('../_db');
const { handleCors, setCors, verifyToken } = require('../_helpers');

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;
  setCors(res);

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const decoded = verifyToken(req);
  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const pool = getPool();
    const result = await pool.query(
      'SELECT id, full_name, username, role, is_active, created_at FROM users WHERE id = $1',
      [decoded.id]
    );
    const user = result.rows[0];
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.json({
      user: {
        id: user.id,
        fullName: user.full_name,
        username: user.username,
        role: user.role,
        isActive: user.is_active,
        createdAt: user.created_at,
      },
    });
  } catch (err) {
    console.error('Me error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
