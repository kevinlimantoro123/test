const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db/database");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/auth");

//Create a user
router.post("/register", async (req, res) => {
  try {
    const { name, pwd } = req.body;
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const newUser = await pool.query(
      "INSERT INTO users (name, pwd) VALUES($1, $2) RETURNING*",
      [name, hashedPwd]
    );
    const token = jwtGenerator(newUser.rows[0].id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
  }
});

//Login user
router.post("/login", async (req, res) => {
  try {
    const { name, pwd } = req.body;
    const userAuth = await pool.query("SELECT * FROM users WHERE name = $1", [
      name,
    ]);

    const user = userAuth.rows[0];
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const pwdMatch = await bcrypt.compare(pwd, user.pwd);
    if (!pwdMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwtGenerator(user.id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
  }
});

//Verify token
router.get("/verify", authorization, async (req, res) => {
  try {
    res.json({ auth: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
