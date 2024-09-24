import React, { useState, useEffect } from "react";
import EventService from "../services/EventService";
import "./classes/Addvote.css";

function AddVote() {
  const [name, setName] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [resultDate,setResultDate] =useState('')
  useEffect(() => {
    EventService.getEvents().then((response) => {
      const extractDates = (events) => {
        return events.flatMap((event) => event.dates);
      };
      setEvents(response.data);
      const datesArray = extractDates(response.data);
    });
  }, []);

  const handleVoteSubmit = async (eventId) => {
    const voteData = { name, votes: selectedDates };

    try {
      EventService.submitVote(eventId, voteData).then((response) => {});
    } catch (error) {}
  };

  const handleDivClick = (index) => {
    if (selectedDates.includes(index)) {
      setSelectedDates(selectedDates.filter((i) => i !== index));
    } else {
      setSelectedDates([...selectedDates, index]);
    }
  };
  const fetchResult = (eventId) => {
    try {
      EventService.getResultEvent(eventId).then((response) => {
        setResultDate(response.data.commonDate)
      });
    } catch (error) {}
  };
  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    const date = new Date(`${year}-${month}-${day}`);

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  return (
    <div className="form-container">
      <h1>Vote Submission</h1>
      {events.map((event) => (
        <div key={event._id} className="event-card">
          <h2 className="event-name">Event Name: {event.name}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleVoteSubmit(event._id);
            }}
            className="vote-form"
          >
            <label htmlFor="name-input" className="form-label">Enter your name:</label>
            <input
              type="text"
              id="name-input"
              className="name-input"
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
            />
            <h3>Dates</h3>
            <div className="dates-container">
              {event.dates.map((date, index) => (
                <div
                  key={index}
                  className="date-div"
                  onClick={() => handleDivClick(formatDate(date))}
                >
                  {formatDate(date)}
                </div>
              ))}
            </div>

            <button type="submit" className="submit-button">Vote</button>
            <div className="fetch-button" onClick={() => fetchResult(event._id)}>
              Get Result For this Event
            </div>
            { resultDate && <h3>Common Date - {resultDate}</h3>}
          </form>
        </div>
      ))}
    </div>
  );
}

export default AddVote;
