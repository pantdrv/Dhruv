const mongoose = require("mongoose");
// Define the schema for participants' votes
const participantSchema = new mongoose.Schema({
  name: [{ type: String, required: true }], // Array of names (updated)
  votes: [{ type: String }], // A single voted date as a string (updated)
});
// Define the schema for the event
const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dates: [{ type: String }], // Dates available for the event
    participants: [participantSchema] // Array of participants with their votes
});
module.exports = mongoose.model("Event", eventSchema);
