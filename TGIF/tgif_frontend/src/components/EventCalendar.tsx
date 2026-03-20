import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../Context/LanguageContext';
import axios from "axios";
import '../styles/calendar.css';

interface EventData {
  id: number;
  titleEn: string;      // Fixed to camelCase
  titleFr: string;      // Fixed to camelCase
  descriptionEn?: string;
  descriptionFr?: string;
  date: string;
  time: string;
  venueEn?: string;
  venueFr?: string;
  eventType: string;    // Fixed to camelCase
  price?: number | null;
  currency?: string;
  registrationOpen?: boolean;
  imageUrl?: string;    // Fixed to camelCase
  [key: string]: any;
}

const EventCalendar: React.FC = () => {
  const { t, getField } = useLanguage();
  const navigate = useNavigate();
  
  // Note: Using March 2026 to match your sample data
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1));
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/event");
        // Use the array directly based on your console log
        const data = Array.isArray(res.data) ? res.data : res.data?.items || [];
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };
    fetchEvents();
  }, []);

  const monthNames_en = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthNames_fr = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const dayNames_en = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayNames_fr = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const eventDates = useMemo(() => {
    const dates: Record<string, EventData[]> = {};
    events.forEach((event) => {
      // Split YYYY-MM-DD to avoid timezone shifts
      const [eYear, eMonth, eDay] = event.date.split('-').map(Number);
      
      if (eYear === year && (eMonth - 1) === month) {
        const dayKey = eDay.toString();
        if (!dates[dayKey]) dates[dayKey] = [];
        dates[dayKey].push(event);
      }
    });
    return dates;
  }, [year, month, events]);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedEvent(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedEvent(null);
  };

  const handleDayClick = (day: number) => {
    const dayStr = day.toString();
    if (eventDates[dayStr] && eventDates[dayStr].length > 0) {
      setSelectedEvent(eventDates[dayStr][0]);
    }
  };

  const handleRegisterClick = (eventId: number) => {
    navigate(`/registration?eventId=${eventId}`);
  };

  const dayNames = t(dayNames_en.join(','), dayNames_fr.join(',')).split(',');
  const monthName = t(monthNames_en[month], monthNames_fr[month]);

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="calendar-day calendar-day-empty"></div>);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dayStr = day.toString();
    const hasEvent = !!eventDates[dayStr];
    
    // Check if the selected event matches this specific day
    const isSelected = selectedEvent && 
                       parseInt(selectedEvent.date.split('-')[2]) === day &&
                       (parseInt(selectedEvent.date.split('-')[1]) - 1) === month;

    calendarDays.push(
      <div
        key={day}
        className={`calendar-day ${hasEvent ? 'calendar-day-event' : ''} ${isSelected ? 'calendar-day-selected' : ''}`}
        onClick={() => handleDayClick(day)}
      >
        <span className="day-number">{day}</span>
        {hasEvent && <span className="event-dot"></span>}
      </div>
    );
  }

  return (
    <section id="calendar" className="calendar-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">{t('Event Calendar', 'Calendrier des Événements')}</span>
          <h2 className="section-title">{t('Upcoming Celebrations', 'Célébrations à Venir')}</h2>
          <p className="section-description">
            {t(
              'Browse our calendar to find events near you. Click on highlighted dates to see event details.',
              'Parcourez notre calendrier pour trouver des événements près de chez vous. Cliquez sur les dates en surbrillance pour voir les détails.'
            )}
          </p>
        </div>

        <div className="calendar-layout">
          <div className="calendar-grid-wrapper">
            <div className="calendar-header-nav">
              <button className="calendar-nav-btn" onClick={prevMonth}>◀</button>
              <h3 className="calendar-month-title">{monthName} {year}</h3>
              <button className="calendar-nav-btn" onClick={nextMonth}>▶</button>
            </div>
            <div className="calendar-day-names">
              {dayNames.map((name) => (
                <div key={name} className="calendar-day-name">{name}</div>
              ))}
            </div>
            <div className="calendar-grid">{calendarDays}</div>
          </div>

          <div className="calendar-detail-panel">
            {selectedEvent ? (
              <div className="event-detail-card">
                <img
                  src={selectedEvent.imageUrl || selectedEvent.image_url}
                  alt={getField(selectedEvent, 'title')}
                  className="event-detail-image"
                />
                <div className="event-detail-content">
                  <span className={`event-type-badge ${selectedEvent.eventType === 'paid' ? 'badge-paid' : 'badge-free'}`}>
                    {selectedEvent.eventType === 'paid'
                      ? t('Paid Event', 'Événement Payant')
                      : t('Free Event', 'Événement Gratuit')}
                  </span>
                  <h3 className="event-detail-title">{getField(selectedEvent, 'title')}</h3>
                  <p className="event-detail-desc">{getField(selectedEvent, 'description')}</p>
                  <div className="event-detail-meta">
                    <div className="meta-item">
                      <span className="meta-icon">📅</span>
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">⏰</span>
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">📍</span>
                      <span>{t(selectedEvent.venueEn, selectedEvent.venueFr)}</span>
                    </div>
                    {selectedEvent.price && (
                      <div className="meta-item">
                        <span className="meta-icon">💰</span>
                        <span>${selectedEvent.price} {selectedEvent.currency}</span>
                      </div>
                    )}
                  </div>
                  <button
                    className="event-register-btn"
                    onClick={() => handleRegisterClick(selectedEvent.id)}
                  >
                    {selectedEvent.registrationOpen
                      ? t('Register Now', "S'inscrire Maintenant")
                      : t('Registration Opens Soon', 'Inscription Bientôt')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="event-detail-placeholder">
                <span className="placeholder-icon">📅</span>
                <p>{t('Select a highlighted date to view event details', 'Sélectionnez une date en surbrillance pour voir les détails')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCalendar;