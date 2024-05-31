const express = require("express");
const router = express.Router();
const pool = require("../db/database");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/auth");

//Get all users
router.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Get specific user (select by id)
router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Update user (by id)
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, pwd } = req.body;
    const updateUser = await pool.query(
      "UPDATE users SET name = $1, pwd = $2 WHERE id = $3",
      [name, pwd, id]
    );
    res.json("User has been updated");
  } catch (err) {
    console.error(err.message);
  }
});

//Delete user
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);
    res.json("User has been deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
