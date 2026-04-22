const { getPool } = require('../_db');
const { handleCors, setCors, verifyToken } = require('../_helpers');

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;
  setCors(res);

  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Unauthorized' });

  const { q } = req.query;
  if (!q || q.trim().length < 2) {
    return res.status(400).json({ message: 'Search query must be at least 2 characters' });
  }

  try {
    const pool = getPool();
    const term = q.trim();
    const result = await pool.query(
      `SELECT
        c.id            AS "CUST_ID",
        c.full_name     AS "ACCT_NAME",
        c.phone_no      AS "PHONE_NO",
        c.email,
        c.address,
        a.account_no    AS "FORACID",
        a.account_type  AS "ACCT_TYPE",
        a.balance       AS "CLRBAL",
        a.account_status AS "ACCT_STATUS",
        a.branch_code   AS "BRANCH_CODE",
        a.open_date     AS "OPEN_DATE"
      FROM customers c
      JOIN accounts a ON a.customer_id = c.id
      WHERE a.account_no ILIKE $1 OR c.phone_no ILIKE $1 OR c.full_name ILIKE $2
      ORDER BY c.full_name LIMIT 20`,
      [`%${term}%`, `%${term}%`]
    );
    return res.json({ customers: result.rows, count: result.rows.length });
  } catch (err) {
    console.error('Search error:', err);
    return res.status(500).json({ message: 'Search failed' });
  }
};
