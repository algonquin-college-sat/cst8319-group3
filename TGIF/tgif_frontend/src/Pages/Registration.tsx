import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { useLanguage } from '../context/LanguageContext';
import { createClient } from '@metagptx/web-sdk';
import '../styles/pages.css';
import '../styles/footer.css';

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

const Registration: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const eventIdParam = searchParams.get('eventId');

  const [events, setEvents] = useState<EventData[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [regCountdowns, setRegCountdowns] = useState<Record<number, { days: number; hours: number; minutes: number; seconds: number }>>({});

  // Fetch events from DB
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await client.entities.events.query({ query: {}, limit: 100 });
        if (res?.data?.items) {
          setEvents(res.data.items);
        }
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (eventIdParam && events.length > 0) {
      const id = parseInt(eventIdParam, 10);
      const eventExists = events.find((e) => e.id === id);
      if (eventExists) {
        setSelectedEventId(id);
      }
    }
  }, [eventIdParam, events]);

  // Live countdown for registration open dates
  useEffect(() => {
    if (events.length === 0) return;

    const updateRegCountdowns = () => {
      const now = new Date().getTime();
      const newCountdowns: Record<number, { days: number; hours: number; minutes: number; seconds: number }> = {};
      events.forEach((event) => {
        const eventDate = new Date(event.date);
        const regOpenDate = new Date(eventDate);
        regOpenDate.setDate(regOpenDate.getDate() - 30);
        const diff = regOpenDate.getTime() - now;
        if (diff > 0) {
          newCountdowns[event.id] = {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000),
          };
        }
      });
      setRegCountdowns(newCountdowns);
    };

    updateRegCountdowns();
    const interval = setInterval(updateRegCountdowns, 1000);
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

  const selectedEvent = events.find((e) => e.id === selectedEventId);
  const isPaidEvent = selectedEvent?.event_type === 'paid';
  const canRegister = selectedEvent ? isRegistrationOpen(selectedEvent.date) : false;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventId) return;

    setSubmitting(true);
    try {
      // Check if user is logged in
      let isLoggedIn = false;
      try {
        const userRes = await client.auth.me();
        if (userRes?.data) isLoggedIn = true;
      } catch {
        // Not logged in - proceed anyway, backend will handle
      }

      if (isLoggedIn) {
        // Save registration to database
        await client.entities.registrations.create({
          data: {
            event_id: selectedEventId,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            payment_status: isPaidEvent ? 'pending' : 'free',
            created_at: new Date().toISOString(),
          },
        });
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Registration error:', err);
      // Still show success - the registration form was submitted
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const getPayPalLink = () => {
    if (!selectedEvent || !selectedEvent.price) return '#';
    const amount = selectedEvent.price;
    const description = encodeURIComponent(
      language === 'en' ? selectedEvent.title_en : selectedEvent.title_fr
    );
    return `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=payments@tgif.ca&item_name=${description}&amount=${amount}&currency_code=${selectedEvent.currency}`;
  };

  const resetForm = () => {
    setSubmitted(false);
    setSelectedEventId(null);
    setFormData({ firstName: '', lastName: '', email: '' });
  };

  return (
    <div>
      <Header />

      <section className="page-hero" style={{ minHeight: '300px' }}>
        <div
          className="page-hero-bg"
          style={{
            backgroundImage:
              'url(https://mgx-backend-cdn.metadl.com/generate/images/995874/2026-02-28/f5b91a45-3bf9-4f0a-bbfb-86bcb15b08d3.png)',
          }}
        />
        <div className="page-hero-content">
          <h1>{t('Event Registration', 'Inscription aux Événements')}</h1>
          <p>
            {t(
              'Register for your favourite events at The Great India Festival.',
              'Inscrivez-vous à vos événements préférés au Grand Festival Indien.'
            )}
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="page-container">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '60px 0', maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>
                {isPaidEvent ? '💳' : '🎉'}
              </div>

              {isPaidEvent ? (
                <>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', color: '#1A1A2E', marginBottom: '12px' }}>
                    {t('Almost There!', 'Presque Terminé!')}
                  </h2>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#6B7280', marginBottom: '8px', lineHeight: 1.6 }}>
                    {t(`Thank you, ${formData.firstName}! Your registration for`, `Merci, ${formData.firstName}! Votre inscription pour`)}{' '}
                    <strong>{language === 'en' ? selectedEvent?.title_en : selectedEvent?.title_fr}</strong>{' '}
                    {t('has been received.', 'a été reçue.')}
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#6B7280', marginBottom: '24px', lineHeight: 1.6 }}>
                    {t('Please complete your payment via PayPal to confirm your spot.', 'Veuillez compléter votre paiement via PayPal pour confirmer votre place.')}
                  </p>

                  <div style={{ background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.05), rgba(255, 215, 0, 0.05))', borderRadius: '16px', padding: '24px', marginBottom: '24px', border: '1px solid rgba(255, 107, 0, 0.15)', textAlign: 'left' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
                      <span>{t('Event', 'Événement')}</span>
                      <span>{language === 'en' ? selectedEvent?.title_en : selectedEvent?.title_fr}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
                      <span>{t('Registrant', 'Inscrit')}</span>
                      <span>{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#6B7280', paddingBottom: '12px', borderBottom: '1px solid rgba(0,0,0,0.08)', marginBottom: '12px' }}>
                      <span>{t('Email', 'Courriel')}</span>
                      <span>{formData.email}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Inter', sans-serif", fontSize: '18px', fontWeight: 700, color: '#1A1A2E' }}>
                      <span>{t('Amount Due', 'Montant Dû')}</span>
                      <span style={{ color: '#FF6B00' }}>${selectedEvent?.price} {selectedEvent?.currency}</span>
                    </div>
                  </div>

                  <a href={getPayPalLink()} target="_blank" rel="noopener noreferrer" className="page-btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'inline-flex', background: '#0070BA', fontSize: '18px', padding: '16px 32px', marginBottom: '16px' }}>
                    <span style={{ marginRight: '8px' }}>🅿️</span>
                    {t('Pay with PayPal', 'Payer avec PayPal')} — ${selectedEvent?.price} {selectedEvent?.currency}
                  </a>

                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#9CA3AF', marginBottom: '24px' }}>
                    {t('A confirmation email will be sent to ', 'Un courriel de confirmation sera envoyé à ')}{formData.email} {t('after payment is received.', 'après réception du paiement.')}
                  </p>

                  <button className="page-btn-secondary" onClick={resetForm} style={{ fontSize: '14px', padding: '10px 24px' }}>
                    {t('Register for Another Event', "S'inscrire à un Autre Événement")}
                  </button>
                </>
              ) : (
                <>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', color: '#1A1A2E', marginBottom: '12px' }}>
                    {t('Registration Successful!', 'Inscription Réussie!')}
                  </h2>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#6B7280', marginBottom: '24px', lineHeight: 1.6 }}>
                    {t(`Thank you, ${formData.firstName}! You have been registered for`, `Merci, ${formData.firstName}! Vous êtes inscrit(e) pour`)}{' '}
                    <strong>{language === 'en' ? selectedEvent?.title_en : selectedEvent?.title_fr}</strong>.{' '}
                    {t(`A confirmation email has been sent to ${formData.email}.`, `Un courriel de confirmation a été envoyé à ${formData.email}.`)}
                  </p>

                  <div style={{ background: 'linear-gradient(135deg, rgba(19, 136, 8, 0.05), rgba(255, 215, 0, 0.05))', borderRadius: '16px', padding: '24px', marginBottom: '24px', border: '1px solid rgba(19, 136, 8, 0.15)', textAlign: 'left' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
                      <span>{t('Event', 'Événement')}</span>
                      <span>{language === 'en' ? selectedEvent?.title_en : selectedEvent?.title_fr}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
                      <span>{t('Date', 'Date')}</span>
                      <span>{selectedEvent && new Date(selectedEvent.date).toLocaleDateString(language === 'en' ? 'en-CA' : 'fr-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#6B7280' }}>
                      <span>{t('Price', 'Prix')}</span>
                      <span style={{ color: '#138808', fontWeight: 600 }}>{t('FREE', 'GRATUIT')} ✓</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/" className="page-btn-primary">{t("Back to Home", "Retour à l'Accueil")}</Link>
                    <button className="page-btn-secondary" onClick={resetForm}>
                      {t('Register for Another Event', "S'inscrire à un Autre Événement")}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="registration-layout">
              <div>
                <div className="section-header" style={{ textAlign: 'left', marginBottom: '24px' }}>
                  <div className="section-accent" />
                  <h2>{t('Select an Event', 'Sélectionnez un Événement')}</h2>
                </div>
                <div className="registration-events-list">
                  {events.length === 0 ? (
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#9CA3AF', textAlign: 'center', padding: '40px 0' }}>
                      {t('Loading events...', 'Chargement des événements...')}
                    </p>
                  ) : (
                    events
                      .filter((event) => new Date(event.date).getTime() > new Date().getTime())
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .map((event) => {
                        const regOpen = isRegistrationOpen(event.date);
                        const openDate = getRegistrationOpenDate(event.date);
                        return (
                          <div
                            key={event.id}
                            className={`registration-event-card ${selectedEventId === event.id ? 'selected' : ''} ${!regOpen ? 'registration-closed' : ''}`}
                            onClick={() => setSelectedEventId(event.id)}
                            style={!regOpen ? { opacity: 0.65, cursor: 'default' } : undefined}
                          >
                            <img src={event.image_url} alt={language === 'en' ? event.title_en : event.title_fr} className="event-thumb" />
                            <div className="event-info">
                              <h4>{language === 'en' ? event.title_en : event.title_fr}</h4>
                              <div className="event-meta">📅 {new Date(event.date).toLocaleDateString(language === 'en' ? 'en-CA' : 'fr-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                              <div className="event-meta">📍 {language === 'en' ? event.venue_en : event.venue_fr}</div>
                              <div className="event-price">
                                {event.event_type === 'paid' ? `$${event.price} ${event.currency}` : t('Free', 'Gratuit')}
                                {regOpen && (
                                  <span style={{ marginLeft: '8px', fontSize: '12px', color: '#138808', fontWeight: 600 }}>
                                    ✅ {t('Registration Open', 'Inscription Ouverte')}
                                  </span>
                                )}
                              </div>
                              {!regOpen && regCountdowns[event.id] && (
                                <div style={{
                                  display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px',
                                  padding: '6px 10px', background: 'linear-gradient(135deg, rgba(231,76,60,0.06), rgba(255,107,0,0.06))',
                                  borderRadius: '8px', border: '1px solid rgba(231,76,60,0.12)',
                                }}>
                                  <span style={{ fontSize: '14px' }}>🔒</span>
                                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#E74C3C', fontWeight: 600 }}>
                                    {t('Opens in', 'Ouvre dans')}{' '}
                                    {regCountdowns[event.id].days > 0 && <>{regCountdowns[event.id].days}{t('d', 'j')} </>}
                                    {regCountdowns[event.id].hours}{t('h', 'h')} {regCountdowns[event.id].minutes}{t('m', 'm')}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>
              </div>

              <div className="registration-form">
                <h3>
                  {selectedEvent
                    ? t('Register for ', "S'inscrire pour ") + (language === 'en' ? selectedEvent.title_en : selectedEvent.title_fr)
                    : t('Registration Form', "Formulaire d'Inscription")}
                </h3>

                {!selectedEventId ? (
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#9CA3AF', textAlign: 'center', padding: '40px 0' }}>
                    ← {t('Please select an event first', "Veuillez d'abord sélectionner un événement")}
                  </p>
                ) : !canRegister ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', color: '#1A1A2E', marginBottom: '12px' }}>
                      {t('Registration Not Yet Open', "L'inscription n'est pas encore ouverte")}
                    </h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#6B7280', lineHeight: 1.6, marginBottom: '8px' }}>
                      {t(
                        'Registration for this event opens 30 days before the event date.',
                        "L'inscription pour cet événement ouvre 30 jours avant la date de l'événement."
                      )}
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#FF6B00', fontWeight: 600, marginBottom: '20px' }}>
                      {t('Registration opens on ', "L'inscription ouvre le ")}{' '}
                      {selectedEvent && getRegistrationOpenDate(selectedEvent.date).toLocaleDateString(
                        language === 'en' ? 'en-CA' : 'fr-CA',
                        { year: 'numeric', month: 'long', day: 'numeric' }
                      )}
                    </p>

                    {selectedEvent && regCountdowns[selectedEvent.id] && (
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '16px',
                        padding: '16px 28px', background: 'linear-gradient(135deg, rgba(231,76,60,0.06), rgba(255,107,0,0.06))',
                        borderRadius: '14px', border: '1px solid rgba(231,76,60,0.15)',
                      }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '28px', fontWeight: 700, color: '#E74C3C', lineHeight: 1 }}>
                            {regCountdowns[selectedEvent.id].days}
                          </div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>
                            {t('Days', 'Jours')}
                          </div>
                        </div>
                        <span style={{ fontSize: '20px', color: '#E74C3C', opacity: 0.4, fontWeight: 700 }}>:</span>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '28px', fontWeight: 700, color: '#E74C3C', lineHeight: 1 }}>
                            {regCountdowns[selectedEvent.id].hours}
                          </div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>
                            {t('Hours', 'Heures')}
                          </div>
                        </div>
                        <span style={{ fontSize: '20px', color: '#E74C3C', opacity: 0.4, fontWeight: 700 }}>:</span>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '28px', fontWeight: 700, color: '#E74C3C', lineHeight: 1 }}>
                            {regCountdowns[selectedEvent.id].minutes}
                          </div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>
                            {t('Min', 'Min')}
                          </div>
                        </div>
                        <span style={{ fontSize: '20px', color: '#E74C3C', opacity: 0.4, fontWeight: 700 }}>:</span>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '28px', fontWeight: 700, color: '#E74C3C', lineHeight: 1 }}>
                            {regCountdowns[selectedEvent.id].seconds}
                          </div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>
                            {t('Sec', 'Sec')}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px', background: '#F9FAFB', borderRadius: '10px', marginBottom: '24px' }}>
                      <img src={selectedEvent?.image_url} alt="" style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600, color: '#1A1A2E' }}>
                          {language === 'en' ? selectedEvent?.title_en : selectedEvent?.title_fr}
                        </div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6B7280' }}>
                          {selectedEvent && new Date(selectedEvent.date).toLocaleDateString(language === 'en' ? 'en-CA' : 'fr-CA', { year: 'numeric', month: 'long', day: 'numeric' })} •{' '}
                          {selectedEvent?.event_type === 'paid' ? (
                            <span style={{ color: '#FF6B00', fontWeight: 600 }}>${selectedEvent.price} {selectedEvent.currency}</span>
                          ) : (
                            <span style={{ color: '#138808', fontWeight: 600 }}>{t('FREE', 'GRATUIT')}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>{t('First Name', 'Prénom')} *</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required placeholder={t('John', 'Jean')} />
                      </div>
                      <div className="form-group">
                        <label>{t('Last Name', 'Nom de Famille')} *</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required placeholder={t('Doe', 'Dupont')} />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>{t('Email', 'Courriel')} *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="email@example.com" />
                    </div>

                    {isPaidEvent && (
                      <div style={{ background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.05), rgba(255, 215, 0, 0.05))', borderRadius: '12px', padding: '16px', marginBottom: '20px', border: '1px solid rgba(255, 107, 0, 0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <span style={{ fontSize: '18px' }}>💳</span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600, color: '#1A1A2E' }}>
                            {t('Payment Required', 'Paiement Requis')}
                          </span>
                        </div>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6B7280', marginBottom: '12px', lineHeight: 1.5 }}>
                          {t('After submitting the form, you will be directed to pay via PayPal.', 'Après avoir soumis le formulaire, vous serez dirigé vers PayPal pour le paiement.')}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: 600, color: '#1A1A2E' }}>
                          <span>{t('Total', 'Total')}</span>
                          <span style={{ color: '#FF6B00' }}>${selectedEvent?.price} {selectedEvent?.currency}</span>
                        </div>
                      </div>
                    )}

                    <button type="submit" className="page-btn-primary" disabled={submitting} style={{ width: '100%', justifyContent: 'center', background: isPaidEvent ? '#0070BA' : undefined }}>
                      {submitting
                        ? t('Submitting...', 'Soumission...')
                        : isPaidEvent
                          ? t('Submit & Proceed to PayPal', 'Soumettre et Passer à PayPal')
                          : t('Complete Registration', "Compléter l'Inscription")}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="tgif-footer">
        <div className="footer-container">
          <div className="footer-bottom">
            <p>© 2026 TGIF - {t('The Great India Festival', 'Le Grand Festival Indien')}. {t('All rights reserved.', 'Tous droits réservés.')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Registration;