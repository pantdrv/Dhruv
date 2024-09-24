import React, { useState } from "react";
import EventService from "../services/EventService";
import "./classes/CreateEvent.css";

function CreateEvent() {
  const [name, setName] = useState("");

  const [dates, setDates] = useState([]);

  const handleInputChange = (index, event) => {
    const newDates = [...dates];
    newDates[index] = event.target.value;
    setDates(newDates);
  };

  const handleAddDateInput = () => {
    setDates([...dates, ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      name,
      dates: dates,
    };
    EventService.createEvent(eventData).then((response) => {});
  };

  return (
    <div className="form-container">
      <label className="form-label">
        Event Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-input"
          placeholder="Enter event name"
        />
      </label>
      {dates.map((date, index) => (
        <div key={index} className="date-input-container">
          <input
            type="date"
            value={date}
            onChange={(event) => handleInputChange(index, event)}
            className="date-input"
          />
        </div>
      ))}
      <button onClick={handleAddDateInput} className="add-btn">
        Add Date For Event
      </button>
      <button type="submit" onClick={handleSubmit} className="submit-btn">
        Create Event
      </button>
    </div>
  );
}

export default CreateEvent;
