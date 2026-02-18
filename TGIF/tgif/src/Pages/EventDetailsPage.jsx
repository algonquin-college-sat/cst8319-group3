import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{event.titleEn}</h2>
      <p>{event.descriptionEn}</p>
      <p><b>Date:</b> {event.eventDate}</p>
      <p><b>Location:</b> {event.location}</p>
      <p><b>Price:</b> ${event.price}</p>
      <p><b>Speaker:</b> {event.keynoteSpeaker}</p>
    </div>
  );
}

export default EventDetailsPage;
