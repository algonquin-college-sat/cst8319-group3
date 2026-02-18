import React, { useEffect, useState } from "react";
import { getUpcomingEvents } from "../Services/eventService";
import EventCard from "../Component/EventCard";
import LanguageToggle from "../Component/LanguageToggle";
import "../Styles/LandingPage.css";

const LandingPage = () => {
  const [events, setEvents] = useState([]);
  const [language, setLanguage] = useState("EN");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getUpcomingEvents();
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="landing-container">
      <header>
        <h1>The Great Indian Festival</h1>
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </header>

      <section className="events-section">
        {events.length === 0 ? (
          <p>No upcoming events</p>
        ) : (
          events.map((event) => (
            <EventCard key={event.id} event={event} language={language} />
          ))
        )}
      </section>
    </div>
  );
};

export default LandingPage;
