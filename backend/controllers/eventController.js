const Event = require("../models/Event");

// List all events
exports.listEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create an event
exports.createEvent = async (req, res) => {
  const { name, dates } = req.body;
  try {
    const event = new Event({ name, dates });
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Show a specific event
exports.showEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
//  handle voting on event dates
exports.voteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { name, votes } = req.body;
    // Find the event by its ID
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    const existingParticipant = event.participants.find((participant) =>
      participant.name.includes(name)
    );

    if (existingParticipant) {
      existingParticipant.votes = votes[0];
    } else {
      event.participants.push({ name: [name], votes: votes });
    }
    const updatedEvent = await event.save();

    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

//Get results for an Event
exports.resultEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { name, votes } = req.body;
    const event = await Event.findById(eventId);
    const allDates = event.participants.reduce((dates, participant) => {
      return [...dates, ...participant.votes];
    }, []);

    // Calculate the frequency of each date
    const dateCount = allDates.reduce((acc, date) => {
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const getCommonDate = (obj) => {
      return Object.keys(obj).reduce((highestKey, currentKey) => {
        return obj[currentKey] > obj[highestKey] ? currentKey : highestKey;
      });
    };

    const commonDate = getCommonDate(dateCount);
    res.status(200).json({ commonDate });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
