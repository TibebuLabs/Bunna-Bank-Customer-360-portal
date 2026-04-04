const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getConnection } = require("../db/oracle");

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { username, password, fullName, role } = req.body;
  if (!username || !password || !fullName)
    return res.status(400).json({ message: "All fields are required." });

  try {
    const conn = await getConnection();
    const hashed = await bcrypt.hash(password, 10);

    await conn.execute(
      `INSERT INTO BANK_USERS (USERNAME, PASSWORD_HASH, FULL_NAME, ROLE, CREATED_AT)
       VALUES (:1, :2, :3, :4, SYSDATE)`,
      [username, hashed, fullName, role || "officer"],
      { autoCommit: true }
    );

    await conn.close();
    res.status(201).json({ message: "Account created successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed.", error: err.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required." });

  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT USER_ID, USERNAME, PASSWORD_HASH, FULL_NAME, ROLE
       FROM BANK_USERS WHERE USERNAME = :1`,
      [username],
      { outFormat: require("oracledb").OUT_FORMAT_OBJECT }
    );
    await conn.close();

    const user = result.rows[0];
    if (!user) return res.status(401).json({ message: "Invalid credentials." });

    const match = await bcrypt.compare(password, user.PASSWORD_HASH);
    if (!match) return res.status(401).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { id: user.USER_ID, username: user.USERNAME, role: user.ROLE },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      token,
      user: { username: user.USERNAME, fullName: user.FULL_NAME, role: user.ROLE },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed.", error: err.message });
  }
});

module.exports = router;
