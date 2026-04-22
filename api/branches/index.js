const { getPool } = require('../_db');
const { handleCors, setCors, verifyToken } = require('../_helpers');

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;
  setCors(res);

  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const pool = getPool();
    const result = await pool.query('SELECT * FROM branches ORDER BY region, name LIMIT 500');
    return res.json({ branches: result.rows, count: result.rows.length });
  } catch (err) {
    console.error('Branches error:', err);
    return res.status(500).json({ message: 'Failed to fetch branches' });
  }
};
