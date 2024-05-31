const router = require("express").Router();
const authorization = require("../middleware/auth");
const pool = require("../db/database");

router.post("/", authorization, async (req, res) => {
  try {
    const user = await pool.query("SELECT name FROM users WHERE id = $1", [
      req.user,
    ]);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

module.exports = router;
