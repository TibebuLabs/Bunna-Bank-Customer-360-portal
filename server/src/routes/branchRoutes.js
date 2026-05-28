const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const pool = require('../config/database');

router.use(protect);

// GET /api/branches
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM branches ORDER BY region, name LIMIT 500'
    );
    res.json({ branches: result.rows, count: result.rows.length });
  } catch (err) {
    console.error('Branches error:', err);
    res.status(500).json({ message: 'Failed to fetch branches.' });
  }
});

// GET /api/branches/:solId
router.get('/:solId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM branches WHERE sol_id = $1',
      [req.params.solId]
    );
    if (!result.rows[0]) return res.status(404).json({ message: 'Branch not found.' });
    res.json({ branch: result.rows[0] });
  } catch (err) {
    console.error('Branch error:', err);
    res.status(500).json({ message: 'Failed to fetch branch.' });
  }
});

module.exports = router;
