const { getPool } = require('../_db');
const { handleCors, setCors, verifyToken } = require('../_helpers');

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;
  setCors(res);

  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Unauthorized' });

  const { accountNo } = req.query;

  try {
    const pool = getPool();
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
      WHERE a.account_no = $1`,
      [accountNo]
    );
    if (!result.rows[0]) return res.status(404).json({ message: 'Customer not found' });
    return res.json({ customer: result.rows[0] });
  } catch (err) {
    console.error('Get customer error:', err);
    return res.status(500).json({ message: 'Failed to fetch customer' });
  }
};
