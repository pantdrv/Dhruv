const express = require("express");
const router = express.Router();
const {
  createEvent,
  listEvents,
  showEvent,
  voteEvent,
  resultEvent,
} = require("../controllers/eventController");

router.get("/events", listEvents); // Get all events
router.post("/event", createEvent); // Create new event
router.get("/event/:id", showEvent); // Get a specific event
// Route to vote on event dates
router.post("/event/:id/votes", voteEvent);
router.get("/event/:id/results", resultEvent);

module.exports = router;
