const router = require("express").Router();
const authorization = require("../middleware/auth");
const pool = require("../db/database");

//Create event
router.post("/events", authorization, async (req, res) => {
  try {
    const { title, description, label, day } = req.body;
    const event = await pool.query(
      "INSERT INTO events (title, description, label, day, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [title, description, label, day, req.user]
    );
    res.json(event.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Update event
router.put("/events/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, label, day } = req.body;
    const updateEvent = await pool.query(
      "UPDATE events SET title = $1, description = $2, label = $3, day = $4 WHERE id = $5 AND user_id = $6",
      [title, description, label, day, id, req.user]
    );
    res.json(updateEvent);
  } catch (err) {
    console.error(err.message);
  }
});

//Delete event
router.delete("/events/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEvent = await pool.query("DELETE FROM events WHERE id = $1 AND user_id = $2",
      [id, req.user],
    );
    res.json("Event has been deleted");
  } catch (err) {
    console.error(err.message);
  }
});

//Get all events
router.post("/", authorization, async (req, res) => {
  try {
    const events = await pool.query("SELECT * FROM events WHERE user_id = $1", [
      req.user,
    ]);
    res.json(events.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

module.exports = router;
