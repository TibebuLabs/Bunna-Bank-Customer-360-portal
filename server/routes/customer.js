const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");
const { getConnection } = require("../db/oracle");
const authMiddleware = require("../middleware/auth");

// GET /api/customer/search?query=<account_no or phone>
router.get("/search", authMiddleware, async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ message: "Search query is required." });

  try {
    const conn = await getConnection();

    const result = await conn.execute(
      `SELECT
         c.CUSTOMER_ID,
         c.FULL_NAME,
         c.PHONE_NO,
         c.EMAIL,
         c.NATIONAL_ID,
         c.DATE_OF_BIRTH,
         c.ADDRESS,
         a.ACCOUNT_NO,
         a.ACCOUNT_TYPE,
         a.BALANCE,
         a.ACCOUNT_STATUS,
         a.BRANCH_CODE,
         a.OPEN_DATE,
         c.PROFILE_PICTURE,
         c.SIGNATURE_IMAGE
       FROM CUSTOMERS c
       JOIN ACCOUNTS a ON c.CUSTOMER_ID = a.CUSTOMER_ID
       WHERE a.ACCOUNT_NO = :1 OR c.PHONE_NO = :2`,
      [query, query],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    await conn.close();

    if (!result.rows || result.rows.length === 0)
      return res.status(404).json({ message: "No customer found." });

    // Convert BLOB fields to base64 if they exist
    const customers = await Promise.all(
      result.rows.map(async (row) => {
        const customer = { ...row };

        if (row.PROFILE_PICTURE) {
          const buf = await row.PROFILE_PICTURE.getData();
          customer.PROFILE_PICTURE = `data:image/jpeg;base64,${buf.toString("base64")}`;
        }

        if (row.SIGNATURE_IMAGE) {
          const buf = await row.SIGNATURE_IMAGE.getData();
          customer.SIGNATURE_IMAGE = `data:image/png;base64,${buf.toString("base64")}`;
        }

        return customer;
      })
    );

    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Search failed.", error: err.message });
  }
});

// GET /api/customer/:id/transactions
router.get("/:id/transactions", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { limit = 20 } = req.query;

  try {
    const conn = await getConnection();

    const result = await conn.execute(
      `SELECT * FROM (
         SELECT
           t.TXN_ID,
           t.TXN_DATE,
           t.TXN_TYPE,
           t.AMOUNT,
           t.DESCRIPTION,
           t.CHANNEL,
           t.STATUS
         FROM TRANSACTIONS t
         JOIN ACCOUNTS a ON t.ACCOUNT_ID = a.ACCOUNT_ID
         WHERE a.CUSTOMER_ID = :1
         ORDER BY t.TXN_DATE DESC
       ) WHERE ROWNUM <= :2`,
      [id, Number(limit)],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    await conn.close();
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch transactions.", error: err.message });
  }
});

module.exports = router;
