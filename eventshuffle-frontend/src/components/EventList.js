import React, { useEffect, useState } from 'react';
import './classes/EventList.css'
import EventService from '../services/EventService';

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    EventService.getEvents().then((response) => {
      setEvents(response.data);
    });
  }, []);

  return (
    <div className="events-container">
      <h1>Events</h1>
      <ul className="event-list">
        {events.map((event) => (
          <li key={event._id} className="event-item">
            {event.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
