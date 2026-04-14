import React, { useEffect, useState, useMemo } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "../Context/LanguageContext"
import Countdown from "./Countdown"
import "../styles/events.css"

// Matching your camelCase backend data
interface EventData {
  id: number
  titleEn: string
  titleFr: string
  descriptionEn?: string
  descriptionFr?: string
  date: string // Format: YYYY-MM-DD
  time: string
  venueEn?: string
  venueFr?: string
  eventType: string
  price?: number | null
  currency?: string
  categoryEn?: string
  categoryFr?: string
  imageUrl?: string
  [key: string]: any
}

const UpcomingEvents: React.FC = () => {
  const { t, getField } = useLanguage()
  const navigate = useNavigate()

  const [events, setEvents] = useState<EventData[]>([])
  const [now] = useState(() => new Date().getTime())

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/event")
        // Check if data is directly the array or inside an items property
        const data = Array.isArray(res.data) ? res.data : res.data?.items || []
        setEvents(data)
      } catch (error) {
        console.error("Failed to fetch events:", error)
      }
    }
    fetchEvents()
  }, [])

  // Filter for future events and sort by date
  const upcomingEvents = useMemo(() => {
    return events
      .filter((event) => new Date(event.date).getTime() > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 4)
  }, [events, now])

  const isRegistrationOpen = (eventDate: string): boolean => {
    const eventTime = new Date(eventDate).getTime()
    const diffMs = eventTime - new Date().getTime()
    const diffDays = diffMs / (1000 * 60 * 60 * 24)
    // Open if event is within the next 30 days
    return diffDays >= 0 && diffDays <= 30
  }

  const handleRegisterClick = (id: number) => {
    navigate(`/registration?eventId=${id}`)
  }

  return (
    <section id="events" className="events-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">{t("Don't Miss Out", "Ne Manquez Pas")}</span>
          <h2 className="section-title">
            {t("Upcoming Events", "Événements à Venir")}
          </h2>
          <p className="section-description">
            {t(
              "Discover our next celebrations. Registration opens 30 days before each event.",
              "Découvrez nos prochaines célébrations. L'inscription ouvre 30 jours avant chaque événement."
            )}
          </p>
        </div>

        <div className="events-grid">
          {upcomingEvents.map((event) => {
            const registrationAvailable = isRegistrationOpen(event.date)

            return (
              <div key={event.id} className="event-card">
                <div className="event-card-image-wrapper">
                  <img
                    src={event.imageUrl || event.image_url}
                    alt={getField(event, "title")}
                    className="event-card-image"
                  />
                  <div className="event-card-overlay">
                    <span
                      className={`event-card-badge ${
                        event.eventType === "paid" ? "badge-paid" : "badge-free"
                      }`}
                    >
                      {event.eventType === "paid"
                        ? `$${event.price} ${event.currency}`
                        : t("FREE", "GRATUIT")}
                    </span>
                    <span className="event-card-category">
                      {getField(event, "category")}
                    </span>
                  </div>
                </div>

                <div className="event-card-content">
                  <h3 className="event-card-title">{getField(event, "title")}</h3>
                  <p className="event-card-desc">{getField(event, "description")}</p>

                  <div className="event-card-details">
                    <div className="event-card-detail">
                      <span className="detail-icon">📅</span>
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="event-card-detail">
                      <span className="detail-icon">⏰</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="event-card-detail">
                      <span className="detail-icon">📍</span>
                      <span>{getField(event, "venue")}</span>
                    </div>
                  </div>

                  {/* Self-contained countdown component handles its own interval */}
                  <Countdown targetDate={event.date} />

                  <button
                    className={`event-card-btn ${
                      registrationAvailable ? "btn-register" : "btn-coming-soon"
                    }`}
                    onClick={() =>
                      registrationAvailable && handleRegisterClick(event.id)
                    }
                    disabled={!registrationAvailable}
                  >
                    {registrationAvailable
                      ? t("Register Now", "S'inscrire")
                      : t("Registration Locked", "Inscription Verrouillée")}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default UpcomingEvents;