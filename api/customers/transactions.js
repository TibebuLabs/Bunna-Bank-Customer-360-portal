const { getPool } = require('../_db');
const { handleCors, setCors, verifyToken } = require('../_helpers');

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;
  setCors(res);

  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Unauthorized' });

  const { accountNo, limit = 50 } = req.query;
  if (!accountNo) return res.status(400).json({ message: 'accountNo is required' });

  try {
    const pool = getPool();
    const result = await pool.query(
      `SELECT
        t.id          AS "TXN_ID",
        t.txn_date    AS "TRAN_DATE",
        t.txn_type    AS "TRAN_TYPE",
        t.amount      AS "TRAN_AMT",
        t.description AS "REMARKS",
        t.channel     AS "CHANNEL",
        t.status      AS "STATUS"
      FROM transactions t
      JOIN accounts a ON a.id = t.account_id
      WHERE a.account_no = $1
      ORDER BY t.txn_date DESC
      LIMIT $2`,
      [accountNo, parseInt(limit)]
    );
    return res.json({ transactions: result.rows, count: result.rows.length });
  } catch (err) {
    console.error('Transactions error:', err);
    return res.status(500).json({ message: 'Failed to fetch transactions' });
  }
};
