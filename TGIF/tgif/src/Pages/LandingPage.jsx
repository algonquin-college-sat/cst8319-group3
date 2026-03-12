import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUpcomingEvents } from "../Services/eventService";
import EventCard from "../Component/EventCard";
import "../Styles/LandingPage.css";

const LandingPage = () => {
  const [events, setEvents] = useState([]);

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

  const mainEvent = events[0];
  const otherEvents = events.slice(1);

  return (
    <div className="landing-page">
      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-hero-overlay" />
        <div className="lp-hero-content">
          <p className="lp-hero-kicker">Indian Culture. Global Audience.</p>
          <h1>The Great India Festival</h1>
          <p className="lp-hero-subtitle">
            Celebrating culture, community, and creativity in the heart of Ottawa with free and paid
            events, performances, and experiences for everyone.
          </p>
          <div className="lp-hero-actions">
            <Link to="/events" className="lp-btn lp-btn-primary">
              View Events
            </Link>
            <Link to="/calendar" className="lp-btn lp-btn-outline">
              Festival Calendar
            </Link>
          </div>
        </div>
      </section>

      <div className="lp-content">
        {/* MISSION / HIGHLIGHT EVENT */}
        <section className="lp-section lp-section-mission">
          <div className="lp-section-header">
            <h2>Our Mission</h2>
            <p>
              To create an inclusive, professional festival platform where Indian arts and culture
              connect with communities from every background.
            </p>
          </div>

          <div className="lp-mission-grid">
            <div className="lp-mission-card">
              <h3>Community &amp; Access</h3>
              <p>
                Free and paid events, family-friendly programming, and volunteer opportunities for
                people of all ages and cultures.
              </p>
            </div>
            <div className="lp-mission-card lp-mission-card-highlight">
              <h3>This Month&apos;s Highlight</h3>
              {mainEvent ? (
                <EventCard event={mainEvent} language="EN" />
              ) : (
                <p>No upcoming events yet. Please check back soon.</p>
              )}
            </div>
          </div>
        </section>

        {/* UPCOMING EVENTS */}
        <section className="lp-section">
          <div className="lp-section-header lp-section-header-centered">
            <h2>Upcoming Events</h2>
            <p>
              Browse cultural performances, workshops, and community events. Register online and
              receive email confirmations and reminders.
            </p>
          </div>

          {otherEvents.length === 0 ? (
            <p className="lp-empty">No additional events listed.</p>
          ) : (
            <div className="lp-events-grid">
              {otherEvents.map((event) => (
                <EventCard key={event.id} event={event} language="EN" />
              ))}
            </div>
          )}
          <div className="lp-section-cta">
            <Link to="/events" className="lp-link">
              See all events
            </Link>
          </div>
        </section>

        {/* GALLERY TEASER */}
        <section className="lp-section lp-section-soft">
          <div className="lp-section-header lp-section-header-centered">
            <h2>Festival Moments</h2>
            <p>
              Relive the energy of past years with a gallery of photos and videos from performances,
              food, and community celebrations.
            </p>
          </div>
          <div className="lp-section-cta">
            <Link to="/gallery" className="lp-btn lp-btn-primary">
              View Gallery
            </Link>
          </div>
        </section>

        {/* GET INVOLVED */}
        <section className="lp-section lp-section-soft">
          <div className="lp-section-header lp-section-header-centered">
            <h2>Get Involved</h2>
            <p>
              The festival grows with every volunteer, artist, and supporter who joins. Choose how
              you want to be part of TGIF.
            </p>
          </div>
          <div className="lp-involved-buttons">
            <Link to="/volunteer" className="lp-btn lp-btn-primary">
              Volunteer
            </Link>
            <Link to="/artist" className="lp-btn lp-btn-outline">
              Call for Artists
            </Link>
            <Link to="/events" className="lp-btn lp-btn-ghost">
              Register for Events
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
