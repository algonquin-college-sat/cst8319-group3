import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { createClient } from '@metagptx/web-sdk';
import '../styles/events.css';

const client = createClient();

interface EventData {
  id: number;
  title_en: string;
  title_fr: string;
  description_en?: string;
  description_fr?: string;
  date: string;
  time: string;
  venue_en?: string;
  venue_fr?: string;
  event_type: string;
  price?: number | null;
  currency?: string;
  registration_open?: boolean;
  registration_opens_date?: string;
  category_en?: string;
  category_fr?: string;
  image_url?: string;
}

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const getCountdown = (targetDate: string): CountdownTime => {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const diff = target - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
};

const UpcomingEvents: React.FC = () => {
  const { t, getField } = useLanguage();
  const navigate = useNavigate();
  const [countdowns, setCountdowns] = useState<Record<number, CountdownTime>>({});
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await client.entities.events.query({ query: {}, sort: 'date', limit: 100 });
        if (res?.data?.items) {
          setEvents(res.data.items);
        }
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
    };
    fetchEvents();
  }, []);

  const upcomingEvents = events
    .filter((e) => new Date(e.date).getTime() > new Date().getTime())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  const [regCountdowns, setRegCountdowns] = useState<Record<number, CountdownTime>>({});

  useEffect(() => {
    if (upcomingEvents.length === 0) return;

    const updateCountdowns = () => {
      const newCountdowns: Record<number, CountdownTime> = {};
      const newRegCountdowns: Record<number, CountdownTime> = {};
      upcomingEvents.forEach((event) => {
        newCountdowns[event.id] = getCountdown(event.date);
        const regOpenDate = new Date(event.date);
        regOpenDate.setDate(regOpenDate.getDate() - 30);
        newRegCountdowns[event.id] = getCountdown(regOpenDate.toISOString());
      });
      setCountdowns(newCountdowns);
      setRegCountdowns(newRegCountdowns);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [events]);

  const isRegistrationOpen = (eventDate: string): boolean => {
    const now = new Date();
    const event = new Date(eventDate);
    const diffMs = event.getTime() - now.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 30;
  };

  const getRegistrationOpenDate = (eventDate: string): Date => {
    const event = new Date(eventDate);
    const openDate = new Date(event);
    openDate.setDate(openDate.getDate() - 30);
    return openDate;
  };

  const handleRegisterClick = (eventId: number) => {
    navigate(`/registration?eventId=${eventId}`);
  };

  return (
    <section id="events" className="events-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">{t("Don't Miss Out", 'Ne Manquez Pas')}</span>
          <h2 className="section-title">
            {t('Upcoming Events', 'Événements à Venir')}
          </h2>
          <p className="section-description">
            {t(
              'Discover our next celebrations. Registration opens 30 days before each event.',
              "Découvrez nos prochaines célébrations. L'inscription ouvre 30 jours avant chaque événement."
            )}
          </p>
        </div>

        <div className="events-grid">
          {upcomingEvents.map((event) => {
            const countdown = countdowns[event.id];
            return (
              <div key={event.id} className="event-card">
                <div className="event-card-image-wrapper">
                  <img
                    src={event.image_url}
                    alt={getField(event, 'title')}
                    className="event-card-image"
                  />
                  <div className="event-card-overlay">
                    <span className={`event-card-badge ${event.event_type === 'paid' ? 'badge-paid' : 'badge-free'}`}>
                      {event.event_type === 'paid'
                        ? `$${event.price} ${event.currency}`
                        : t('FREE', 'GRATUIT')}
                    </span>
                    <span className="event-card-category">{getField(event, 'category')}</span>
                  </div>
                </div>

                <div className="event-card-content">
                  <h3 className="event-card-title">{getField(event, 'title')}</h3>
                  <p className="event-card-desc">{getField(event, 'description')}</p>

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
                      <span>{getField(event, 'venue')}</span>
                    </div>
                  </div>

                  {countdown && (
                    <div className="event-countdown">
                      <div className="countdown-item">
                        <span className="countdown-number">{countdown.days}</span>
                        <span className="countdown-label">{t('Days', 'Jours')}</span>
                      </div>
                      <div className="countdown-separator">:</div>
                      <div className="countdown-item">
                        <span className="countdown-number">{countdown.hours}</span>
                        <span className="countdown-label">{t('Hrs', 'Hrs')}</span>
                      </div>
                      <div className="countdown-separator">:</div>
                      <div className="countdown-item">
                        <span className="countdown-number">{countdown.minutes}</span>
                        <span className="countdown-label">{t('Min', 'Min')}</span>
                      </div>
                      <div className="countdown-separator">:</div>
                      <div className="countdown-item">
                        <span className="countdown-number">{countdown.seconds}</span>
                        <span className="countdown-label">{t('Sec', 'Sec')}</span>
                      </div>
                    </div>
                  )}

                  {!isRegistrationOpen(event.date) && regCountdowns[event.id] && (
                    <div className="reg-countdown-banner">
                      <span className="reg-countdown-icon">🔒</span>
                      <div className="reg-countdown-text">
                        <span className="reg-countdown-label">
                          {t('Registration opens in', "L'inscription ouvre dans")}
                        </span>
                        <span className="reg-countdown-time">
                          {regCountdowns[event.id].days > 0 && (
                            <>{regCountdowns[event.id].days} {t('days', 'jours')} </>
                          )}
                          {regCountdowns[event.id].hours} {t('hrs', 'hrs')} {regCountdowns[event.id].minutes} {t('min', 'min')}
                        </span>
                      </div>
                    </div>
                  )}

                  <button
                    className={`event-card-btn ${isRegistrationOpen(event.date) ? 'btn-register' : 'btn-coming-soon'}`}
                    onClick={() => isRegistrationOpen(event.date) && handleRegisterClick(event.id)}
                    disabled={!isRegistrationOpen(event.date)}
                  >
                    {isRegistrationOpen(event.date)
                      ? t('Register Now', "S'inscrire")
                      : t('Registration Locked', 'Inscription Verrouillée')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;