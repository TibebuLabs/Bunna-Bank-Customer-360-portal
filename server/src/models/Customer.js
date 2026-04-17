const pool = require('../config/database');

class Customer {
  // Search by account number, phone, or name
  static async search(query) {
    const q = `
      SELECT
        c.id            AS "CUST_ID",
        c.full_name     AS "ACCT_NAME",
        c.phone_no      AS "PHONE_NO",
        c.email,
        c.national_id,
        c.address,
        a.account_no    AS "FORACID",
        a.account_type  AS "ACCT_TYPE",
        a.balance       AS "CLRBAL",
        a.account_status AS "ACCT_STATUS",
        a.branch_code   AS "BRANCH_CODE",
        a.open_date     AS "OPEN_DATE"
      FROM customers c
      JOIN accounts a ON a.customer_id = c.id
      WHERE
        a.account_no  ILIKE $1 OR
        c.phone_no    ILIKE $1 OR
        c.full_name   ILIKE $2
      ORDER BY c.full_name
      LIMIT 20
    `;
    const term = query.trim();
    const result = await pool.query(q, [`%${term}%`, `%${term}%`]);
    return result.rows;
  }

  // Get single customer with all accounts
  static async findByAccountNo(accountNo) {
    const q = `
      SELECT
        c.id            AS "CUST_ID",
        c.full_name     AS "ACCT_NAME",
        c.phone_no      AS "PHONE_NO",
        c.email,
        c.national_id,
        c.address,
        a.account_no    AS "FORACID",
        a.account_type  AS "ACCT_TYPE",
        a.balance       AS "CLRBAL",
        a.account_status AS "ACCT_STATUS",
        a.branch_code   AS "BRANCH_CODE",
        a.open_date     AS "OPEN_DATE"
      FROM customers c
      JOIN accounts a ON a.customer_id = c.id
      WHERE a.account_no = $1
    `;
    const result = await pool.query(q, [accountNo]);
    return result.rows[0] || null;
  }

  // Get transactions for an account
  static async getTransactions(accountNo, limit = 50) {
    const q = `
      SELECT
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
      LIMIT $2
    `;
    const result = await pool.query(q, [accountNo, limit]);
    return result.rows;
  }

  // Get summary stats
  static async getSummary() {
    const q = `
      SELECT
        COUNT(DISTINCT c.id)                                        AS total_customers,
        COUNT(a.id)                                                 AS total_accounts,
        COUNT(a.id) FILTER (WHERE a.account_status = 'ACTIVE')     AS active_accounts,
        COUNT(a.id) FILTER (WHERE a.account_status = 'FROZEN')     AS frozen_accounts,
        COALESCE(SUM(a.balance), 0)                                 AS total_balance
      FROM customers c
      LEFT JOIN accounts a ON a.customer_id = c.id
    `;
    const result = await pool.query(q);
    return result.rows[0];
  }
}

module.exports = Customer;
