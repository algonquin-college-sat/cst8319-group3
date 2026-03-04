import React, { useState, useEffect } from 'react';
import { useLanguage } from '../Context/useLanguage';
import { useNavigate } from 'react-router-dom';
import { mockEvents } from '../Data/mockData';
import '../styles/events.css';

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

  const upcomingEvents = mockEvents
    .filter((e) => new Date(e.date).getTime() > new Date().getTime())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  useEffect(() => {
    const updateCountdowns = () => {
      const newCountdowns: Record<number, CountdownTime> = {};
      upcomingEvents.forEach((event) => {
        newCountdowns[event.id] = getCountdown(event.date);
      });
      setCountdowns(newCountdowns);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, []);

    const handleRegisterClick = (eventId: number) => {
    navigate(`/registration?eventId=${eventId}`);
  };

  return (
    <section id="events" className="events-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">{t('Don\'t Miss Out', 'Ne Manquez Pas')}</span>
          <h2 className="section-title">
            {t('Upcoming Events', 'Événements à Venir')}
          </h2>
          <p className="section-description">
            {t(
              'Discover our next celebrations. Registration opens 15 days before each event.',
              'Découvrez nos prochaines célébrations. L\'inscription ouvre 15 jours avant chaque événement.'
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

                  <button
                    className={`event-card-btn ${event.registration_open ? 'btn-register' : 'btn-coming-soon'}`}
                    onClick={() => handleRegisterClick(event.id)}
                  >
                    {event.registration_open
                      ? t('Register Now', 'S\'inscrire')
                      : t('Registration Opens Soon', 'Inscription Bientôt')}
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