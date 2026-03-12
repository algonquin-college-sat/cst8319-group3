import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUpcomingEvents } from "../Services/eventService";
import EventCard from "../Component/EventCard";
import "../Styles/LandingPage.css";

// Indian culture / festival imagery (replace with client assets if preferred)
const IMG_COMMUNITY =
  "https://images.pexels.com/photos/1045545/pexels-photo-1045545.jpeg?auto=compress&cs=tinysrgb&w=800";
const IMG_CELEBRATION =
  "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800";
// Placeholders for client-provided images (replace src when client sends assets)
const PLACEHOLDER_HIGHLIGHT = "https://placehold.co/720x400/f5f0ff/c41e5a?text=This+Month%27s+Highlight";
const PLACEHOLDER_EVENT = "https://placehold.co/400x260/fef5ff/c41e5a?text=Event+Image";
const PLACEHOLDER_GALLERY = "https://placehold.co/360x240/fff5f0/c41e5a?text=Festival+Moments";

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
      {/* HERO - Ottawa Festivals style: bold headline + subhead + one CTA */}
      <section className="lp-hero">
        <div className="lp-hero-overlay" />
        <div className="lp-hero-content lp-hero-centered">
          <p className="lp-hero-kicker">Ottawa&apos;s Indian Cultural Festival</p>
          <h1>Canada&apos;s Great India Festival</h1>
          <p className="lp-hero-subtitle">
            Connecting you to Indian arts, performances, food, and community events in the capital.
          </p>
          <Link to="/events" className="lp-btn lp-btn-primary">
            See What&apos;s On
          </Link>
        </div>
      </section>

      <div className="lp-content">
        {/* ABOUT STRIP - like Ottawa Festivals "Learn More" */}
        <section className="lp-section lp-about-strip">
          <div className="lp-about-strip-inner">
            <div className="lp-about-strip-text">
              <h2>The Great India Festival</h2>
              <p>
                A not-for-profit organization bringing Indian culture to Ottawa through festivals,
                special events, and community programs. Inclusive, family-friendly, and open to all.
              </p>
              <Link to="/about" className="lp-btn lp-btn-outline-dark">
                Learn More
              </Link>
            </div>
            <div className="lp-about-strip-img">
              <img src={`${process.env.PUBLIC_URL || ""}/images.jpeg`} alt="Indian culture and festival" />
            </div>
          </div>
        </section>

        {/* MISSION: Community & Access WITH IMAGE + This Month's Highlight (client image) */}
        <section className="lp-section lp-section-mission">
          <div className="lp-section-header lp-section-header-centered">
            <h2>Our Mission</h2>
            <p>
              To create an inclusive, professional festival platform where Indian arts and culture
              connect with communities from every background.
            </p>
          </div>

          <div className="lp-mission-grid">
            <div className="lp-mission-card lp-mission-card-with-img">
              <div className="lp-mission-card-img">
                <img src={IMG_COMMUNITY} alt="Community and culture" />
              </div>
              <div className="lp-mission-card-body">
                <h3>Community &amp; Access</h3>
                <p>
                  Free and paid events, family-friendly programming, and volunteer opportunities for
                  people of all ages and cultures.
                </p>
              </div>
            </div>
            <div className="lp-mission-card lp-highlight-card">
              <h3>This Month&apos;s Highlight</h3>
              <div className="lp-highlight-img">
                {/* Replace src with client image when provided */}
                <img src={mainEvent?.bannerImageUrl || PLACEHOLDER_HIGHLIGHT} alt="Highlight event" />
              </div>
              {mainEvent ? (
                <EventCard event={mainEvent} language="EN" showImage={false} />
              ) : (
                <p className="lp-no-events">No upcoming events yet. Please check back soon.</p>
              )}
            </div>
          </div>
        </section>

        {/* UPCOMING EVENTS - image per card (client images later) */}
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
                <EventCard
                  key={event.id}
                  event={event}
                  language="EN"
                  imageUrl={event.bannerImageUrl || PLACEHOLDER_EVENT}
                  showImage
                />
              ))}
            </div>
          )}
          <div className="lp-section-cta">
            <Link to="/events" className="lp-link">
              See All Events
            </Link>
          </div>
        </section>

        {/* FESTIVAL MOMENTS - placeholder images (client will provide) */}
        <section className="lp-section lp-section-soft lp-section-gallery">
          <div className="lp-section-header lp-section-header-centered">
            <h2>Festival Moments</h2>
            <p>
              Relive the energy of past years with a gallery of photos and videos from performances,
              food, and community celebrations.
            </p>
          </div>
          <div className="lp-gallery-teaser">
            <div className="lp-gallery-teaser-img">
              <img src={PLACEHOLDER_GALLERY} alt="Festival moment 1" />
            </div>
            <div className="lp-gallery-teaser-img">
              <img src={PLACEHOLDER_GALLERY} alt="Festival moment 2" />
            </div>
            <div className="lp-gallery-teaser-img">
              <img src={PLACEHOLDER_GALLERY} alt="Festival moment 3" />
            </div>
          </div>
          <div className="lp-section-cta">
            <Link to="/gallery" className="lp-btn lp-btn-primary">
              View Gallery
            </Link>
          </div>
        </section>

        {/* GET INVOLVED - with vibrant image */}
        <section className="lp-section lp-section-soft lp-section-involved">
          <div className="lp-involved-inner">
            <div className="lp-involved-img">
              <img src={IMG_CELEBRATION} alt="Join the festival" />
            </div>
            <div className="lp-involved-content">
              <h2>Get Involved</h2>
              <p>
                The festival grows with every volunteer, artist, and supporter who joins. Choose how
                you want to be part of TGIF.
              </p>
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
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
