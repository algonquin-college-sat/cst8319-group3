import React, { useEffect, useState } from "react";
import { getUpcomingEvents } from "../Services/eventService";
import EventCard from '../components/EventCard';
import LanguageToggle from "../components/LanguageToggle";
import "../Styles/LandingPage.css";

interface Event {
  id: string;
  titleEn: string;
  titleFr: string;
  eventDate: string;
  location: string;
  keynoteSpeaker: string;
}

const LandingPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [language, setLanguage] = useState<"en" | "fr">("en");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data: Event[] = await getUpcomingEvents();
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