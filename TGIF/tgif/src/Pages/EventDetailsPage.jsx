import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventById } from "../Services/eventService";
import "./EventDetailsPage.css";

function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySubmitted, setNotifySubmitted] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        setError("Event not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const registrationOpen =
    event?.registrationOpenDate &&
    new Date(event.registrationOpenDate) <= new Date();
  const isFree = event?.type === "FREE" || event?.price == null || event?.price === 0;

  const handleNotifySubmit = (e) => {
    e.preventDefault();
    if (notifyEmail.trim()) {
      setNotifySubmitted(true);
      // TODO: call API to save subscriber email
    }
  };

  if (loading) {
    return (
      <div className="edp-page">
        <p className="edp-loading">Loading event...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="edp-page">
        <p className="edp-error">{error || "Event not found."}</p>
        <Link to="/events" className="edp-back">Back to Events</Link>
      </div>
    );
  }

  return (
    <div className="edp-page">
      <div className="edp-hero">
        <div
          className="edp-hero-bg"
          style={{
            backgroundImage: event.bannerImageUrl
              ? `url(${event.bannerImageUrl})`
              : "linear-gradient(135deg, #ff2d92 0%, #ff8a3d 100%)",
          }}
        />
        <div className="edp-hero-overlay" />
        <div className="edp-hero-content">
          <h1>{event.titleEn}</h1>
          <p className="edp-meta">
            {event.eventDate} · {event.location}
          </p>
          {event.price != null && (
            <span className={`edp-badge ${isFree ? "edp-badge-free" : "edp-badge-paid"}`}>
              {isFree ? "Free" : `$${event.price}`}
            </span>
          )}
        </div>
      </div>

      <div className="edp-content">
        <div className="edp-main">
          <section className="edp-section">
            <h2>About this event</h2>
            <p className="edp-description">
              {event.descriptionEn || "No description available."}
            </p>
            {event.keynoteSpeaker && (
              <p><strong>Featured:</strong> {event.keynoteSpeaker}</p>
            )}
          </section>

          <section className="edp-section edp-registration">
            <h2>Registration</h2>
            {registrationOpen ? (
              <div>
                <p>Registration is open. Click below to register for this event.</p>
                <Link
                  to={`/register/${event.id}`}
                  className="edp-btn edp-btn-primary"
                >
                  {isFree ? "Register (Free)" : "Register & Pay"}
                </Link>
              </div>
            ) : (
              <div>
                <p>Registration is not open yet. Enter your email to be notified when it opens.</p>
                {!notifySubmitted ? (
                  <form onSubmit={handleNotifySubmit} className="edp-notify-form">
                    <input
                      type="email"
                      placeholder="Your email"
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      required
                      className="edp-input"
                    />
                    <button type="submit" className="edp-btn edp-btn-primary">
                      Notify me
                    </button>
                  </form>
                ) : (
                  <p className="edp-notify-success">Thanks! We&apos;ll email you when registration opens.</p>
                )}
              </div>
            )}
          </section>
        </div>

        <aside className="edp-sidebar">
          <div className="edp-card">
            <h3>Details</h3>
            <p><strong>Date</strong><br />{event.eventDate}</p>
            <p><strong>Location</strong><br />{event.location}</p>
            {event.price != null && (
              <p><strong>Price</strong><br />{isFree ? "Free" : `$${event.price}`}</p>
            )}
          </div>
          <Link to="/events" className="edp-back">← All events</Link>
        </aside>
      </div>
    </div>
  );
}

export default EventDetailsPage;
