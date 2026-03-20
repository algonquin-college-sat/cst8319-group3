import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUpcomingEvents } from "../Services/eventService";
import EventCard from '../components/EventCard.jsx';
//import LanguageToggle from "../components/LanguageToggle";
import "../Styles/LandingPage.css";
import { useLanguage } from "../Context/LanguageContext";
import "en.json";
import "fr.json";

// Indian culture / festival imagery (replace with client assets if preferred)
const IMG_COMMUNITY =
  "https://images.pexels.com/photos/1045545/pexels-photo-1045545.jpeg?auto=compress&cs=tinysrgb&w=800";
const IMG_CELEBRATION =
  "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800";
// Placeholders for client-provided images (replace src when client sends assets)
const PLACEHOLDER_HIGHLIGHT = "https://placehold.co/720x400/f5f0ff/c41e5a?text=This+Month%27s+Highlight";
const PLACEHOLDER_EVENT = "https://placehold.co/400x260/fef5ff/c41e5a?text=Event+Image";
const PLACEHOLDER_GALLERY = "https://placehold.co/360x240/fff5f0/c41e5a?text=Festival+Moments";

interface Event {
  id: string;
  titleEn: string;
  titleFr: string;
  eventDate: string;
  location: string;
  keynoteSpeaker: string;
}

const LandingPage = () => {
  const { t } = useLanguage();
  const [events, setEvents] = useState([]);

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

  const mainEvent = events[0];
  const otherEvents = events.slice(1);

  return (
    <div className="landing-page">
      {/* HERO - Ottawa Festivals style: bold headline + subhead + one CTA */}
      <section className="lp-hero">
        <div className="lp-hero-overlay" />
        <div className="lp-hero-content lp-hero-centered">
          <p className="lp-hero-kicker">{t("landing.heroKicker", "tmp")}</p>
          <h1>{t("landing.heroTitle", "tmp")}</h1>
          <p className="lp-hero-subtitle">
            {t("landing.heroSubtitle", "tmp")}
          </p>
          <Link to="/events" className="lp-btn lp-btn-primary">
            {t("landing.heroCta", "tmp")}
          </Link>
        </div>
      </section>

      <div className="lp-content">
        {/* ABOUT STRIP - like Ottawa Festivals "Learn More" */}
        <section className="lp-section lp-about-strip">
          <div className="lp-about-strip-inner">
            <div className="lp-about-strip-text">
              <h2>{t("landing.aboutTitle", "tmp")}</h2>
              <p>
                {t("landing.aboutText", "tmp")}
              </p>
              <Link to="/about" className="lp-btn lp-btn-outline-dark">
                {t("landing.aboutCta", "tmp")}
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
            <h2>{t("landing.missionTitle", "tmp")}</h2>
            <p>
              {t("landing.missionText", "tmp")}
            </p>
          </div>

          <div className="lp-mission-grid">
            <div className="lp-mission-card lp-mission-card-with-img">
              <div className="lp-mission-card-img">
                <img src={IMG_COMMUNITY} alt="Community and culture" />
              </div>
              <div className="lp-mission-card-body">
                <h3>{t("landing.communityTitle", "tmp")}</h3>
                <p>
                  {t("landing.communityText", "tmp")}
                </p>
              </div>
            </div>
            <div className="lp-mission-card lp-highlight-card">
              <h3>{t("landing.highlightTitle", "tmp")}</h3>
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
            <h2>{t("landing.upcomingTitle", "tmp")}</h2>
            <p>
              {t("landing.upcomingText", "tmp")}
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
              {t("landing.seeAllEvents", "tmp")}
            </Link>
          </div>
        </section>

        {/* FESTIVAL MOMENTS - placeholder images (client will provide) */}
        <section className="lp-section lp-section-soft lp-section-gallery">
          <div className="lp-section-header lp-section-header-centered">
            <h2>{t("landing.momentsTitle", "tmp")}</h2>
            <p>
              {t("landing.momentsText", "tmp")}
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
              {t("landing.viewGallery", "tmp")}
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
              <h2>{t("landing.getInvolvedTitle", "tmp")}</h2>
              <p>
                {t("landing.getInvolvedText", "tmp")}
              </p>
              <div className="lp-involved-buttons">
                <Link to="/volunteer" className="lp-btn lp-btn-primary">
                  {t("landing.volunteerCta", "tmp")}
                </Link>
                <Link to="/artist" className="lp-btn lp-btn-outline">
                  {t("landing.artistsCta", "tmp")}
                </Link>
                <Link to="/events" className="lp-btn lp-btn-ghost">
                  {t("landing.registerCta", "tmp")}
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
