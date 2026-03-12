import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { useLanguage } from '../Context/useLanguage';
import { mockEvents } from '../Data/mockData';
import '../styles/pages.css';
import '../styles/footer.css';


const Registration: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const eventIdParam = searchParams.get('eventId');

  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Set selected event from URL param on mount
 useEffect(() => {
  if (eventIdParam) {
    const id = parseInt(eventIdParam, 10);
    const eventExists = mockEvents.find((e) => e.id === id);
    if (eventExists) {
      // async state update avoids cascade render warning
      setTimeout(() => setSelectedEventId(id), 0);
    }
  }
}, [eventIdParam]);

  const selectedEvent = mockEvents.find((e) => e.id === selectedEventId);
  const isPaidEvent = selectedEvent?.event_type === 'paid';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getPayPalLink = () => {
    if (!selectedEvent || !selectedEvent.price) return '#';
    // PayPal.me link format — user would replace with their actual PayPal link
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

      {/* Hero */}
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

      {/* Registration Content */}
      <section className="page-section">
        <div className="page-container">
          {submitted ? (
            /* ===== SUCCESS STATE ===== */
            <div style={{ textAlign: 'center', padding: '60px 0', maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>
                {isPaidEvent ? '💳' : '🎉'}
              </div>

              {isPaidEvent ? (
                /* Paid event — show PayPal link */
                <>
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '32px',
                      color: '#1A1A2E',
                      marginBottom: '12px',
                    }}
                  >
                    {t('Almost There!', 'Presque Terminé!')}
                  </h2>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '16px',
                      color: '#6B7280',
                      marginBottom: '8px',
                      lineHeight: 1.6,
                    }}
                  >
                    {t(
                      `Thank you, ${formData.firstName}! Your registration for`,
                      `Merci, ${formData.firstName}! Votre inscription pour`
                    )}{' '}
                    <strong>
                      {language === 'en'
                        ? selectedEvent?.title_en
                        : selectedEvent?.title_fr}
                    </strong>{' '}
                    {t('has been received.', 'a été reçue.')}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '16px',
                      color: '#6B7280',
                      marginBottom: '24px',
                      lineHeight: 1.6,
                    }}
                  >
                    {t(
                      'Please complete your payment via PayPal to confirm your spot.',
                      'Veuillez compléter votre paiement via PayPal pour confirmer votre place.'
                    )}
                  </p>

                  {/* Price Summary */}
                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.05), rgba(255, 215, 0, 0.05))',
                      borderRadius: '16px',
                      padding: '24px',
                      marginBottom: '24px',
                      border: '1px solid rgba(255, 107, 0, 0.15)',
                      textAlign: 'left',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        color: '#6B7280',
                        marginBottom: '8px',
                      }}
                    >
                      <span>{t('Event', 'Événement')}</span>
                      <span>
                        {language === 'en'
                          ? selectedEvent?.title_en
                          : selectedEvent?.title_fr}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        color: '#6B7280',
                        marginBottom: '8px',
                      }}
                    >
                      <span>{t('Registrant', 'Inscrit')}</span>
                      <span>
                        {formData.firstName} {formData.lastName}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        color: '#6B7280',
                        paddingBottom: '12px',
                        borderBottom: '1px solid rgba(0,0,0,0.08)',
                        marginBottom: '12px',
                      }}
                    >
                      <span>{t('Email', 'Courriel')}</span>
                      <span>{formData.email}</span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#1A1A2E',
                      }}
                    >
                      <span>{t('Amount Due', 'Montant Dû')}</span>
                      <span style={{ color: '#FF6B00' }}>
                        ${selectedEvent?.price} {selectedEvent?.currency}
                      </span>
                    </div>
                  </div>

                  {/* PayPal Button */}
                  <a
                    href={getPayPalLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="page-btn-primary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      display: 'inline-flex',
                      background: '#0070BA',
                      fontSize: '18px',
                      padding: '16px 32px',
                      marginBottom: '16px',
                    }}
                  >
                    <span style={{ marginRight: '8px' }}>🅿️</span>
                    {t('Pay with PayPal', 'Payer avec PayPal')} — $
                    {selectedEvent?.price} {selectedEvent?.currency}
                  </a>

                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      color: '#9CA3AF',
                      marginBottom: '24px',
                    }}
                  >
                    {t(
                      'A confirmation email will be sent to ',
                      'Un courriel de confirmation sera envoyé à '
                    )}
                    {formData.email}{' '}
                    {t('after payment is received.', 'après réception du paiement.')}
                  </p>

                  <button
                    className="page-btn-secondary"
                    onClick={resetForm}
                    style={{ fontSize: '14px', padding: '10px 24px' }}
                  >
                    {t(
                      'Register for Another Event',
                      "S'inscrire à un Autre Événement"
                    )}
                  </button>
                </>
              ) : (
                /* Free event — direct success */
                <>
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '32px',
                      color: '#1A1A2E',
                      marginBottom: '12px',
                    }}
                  >
                    {t('Registration Successful!', 'Inscription Réussie!')}
                  </h2>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '16px',
                      color: '#6B7280',
                      marginBottom: '24px',
                      lineHeight: 1.6,
                    }}
                  >
                    {t(
                      `Thank you, ${formData.firstName}! You have been registered for`,
                      `Merci, ${formData.firstName}! Vous êtes inscrit(e) pour`
                    )}{' '}
                    <strong>
                      {language === 'en'
                        ? selectedEvent?.title_en
                        : selectedEvent?.title_fr}
                    </strong>
                    .{' '}
                    {t(
                      `A confirmation email has been sent to ${formData.email}.`,
                      `Un courriel de confirmation a été envoyé à ${formData.email}.`
                    )}
                  </p>

                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(19, 136, 8, 0.05), rgba(255, 215, 0, 0.05))',
                      borderRadius: '16px',
                      padding: '24px',
                      marginBottom: '24px',
                      border: '1px solid rgba(19, 136, 8, 0.15)',
                      textAlign: 'left',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        color: '#6B7280',
                        marginBottom: '8px',
                      }}
                    >
                      <span>{t('Event', 'Événement')}</span>
                      <span>
                        {language === 'en'
                          ? selectedEvent?.title_en
                          : selectedEvent?.title_fr}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        color: '#6B7280',
                        marginBottom: '8px',
                      }}
                    >
                      <span>{t('Date', 'Date')}</span>
                      <span>
                        {selectedEvent &&
                          new Date(selectedEvent.date).toLocaleDateString(
                            language === 'en' ? 'en-CA' : 'fr-CA',
                            { year: 'numeric', month: 'long', day: 'numeric' }
                          )}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        color: '#6B7280',
                      }}
                    >
                      <span>{t('Price', 'Prix')}</span>
                      <span style={{ color: '#138808', fontWeight: 600 }}>
                        {t('FREE', 'GRATUIT')} ✓
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/" className="page-btn-primary">
                      {t('Back to Home', 'Retour à l\'Accueil')}
                    </Link>
                    <button className="page-btn-secondary" onClick={resetForm}>
                      {t(
                        'Register for Another Event',
                        "S'inscrire à un Autre Événement"
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* ===== FORM STATE ===== */
            <div className="registration-layout">
              {/* Event Selection */}
              <div>
                <div
                  className="section-header"
                  style={{ textAlign: 'left', marginBottom: '24px' }}
                >
                  <div className="section-accent" />
                  <h2>{t('Select an Event', 'Sélectionnez un Événement')}</h2>
                </div>
                <div className="registration-events-list">
                  {mockEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`registration-event-card ${
                        selectedEventId === event.id ? 'selected' : ''
                      }`}
                      onClick={() => setSelectedEventId(event.id)}
                    >
                      <img
                        src={event.image_url}
                        alt={
                          language === 'en' ? event.title_en : event.title_fr
                        }
                        className="event-thumb"
                      />
                      <div className="event-info">
                        <h4>
                          {language === 'en'
                            ? event.title_en
                            : event.title_fr}
                        </h4>
                        <div className="event-meta">
                          📅{' '}
                          {new Date(event.date).toLocaleDateString(
                            language === 'en' ? 'en-CA' : 'fr-CA',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }
                          )}
                        </div>
                        <div className="event-meta">
                          📍{' '}
                          {language === 'en'
                            ? event.venue_en
                            : event.venue_fr}
                        </div>
                        <div className="event-price">
                          {event.event_type === 'paid'
                            ? `$${event.price} ${event.currency}`
                            : t('Free', 'Gratuit')}
                          {!event.registration_open && (
                            <span
                              style={{
                                marginLeft: '8px',
                                fontSize: '12px',
                                color: '#9CA3AF',
                              }}
                            >
                              ({t('Opens', 'Ouvre le')}{' '}
                              {new Date(
                                event.registration_opens_date
                              ).toLocaleDateString(
                                language === 'en' ? 'en-CA' : 'fr-CA',
                                { month: 'short', day: 'numeric' }
                              )}
                              )
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Registration Form */}
              <div className="registration-form">
                <h3>
                  {selectedEvent
                    ? t('Register for ', "S'inscrire pour ") +
                      (language === 'en'
                        ? selectedEvent.title_en
                        : selectedEvent.title_fr)
                    : t('Registration Form', "Formulaire d'Inscription")}
                </h3>

                {!selectedEventId ? (
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      color: '#9CA3AF',
                      textAlign: 'center',
                      padding: '40px 0',
                    }}
                  >
                    ←{' '}
                    {t(
                      'Please select an event first',
                      "Veuillez d'abord sélectionner un événement"
                    )}
                  </p>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {/* Event Summary */}
                    <div
                      style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center',
                        padding: '12px',
                        background: '#F9FAFB',
                        borderRadius: '10px',
                        marginBottom: '24px',
                      }}
                    >
                      <img
                        src={selectedEvent?.image_url}
                        alt=""
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '8px',
                          objectFit: 'cover',
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#1A1A2E',
                          }}
                        >
                          {language === 'en'
                            ? selectedEvent?.title_en
                            : selectedEvent?.title_fr}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '13px',
                            color: '#6B7280',
                          }}
                        >
                         {selectedEvent?.date
                            ? new Date(selectedEvent.date).toLocaleDateString(
                              language === 'en' ? 'en-CA' : 'fr-CA',
                              { year: 'numeric', month: 'long', day: 'numeric' }
                            )
                                : 'Date unavailable'}
                          •{' '}
                          •{' '}
                          {selectedEvent?.event_type === 'paid' ? (
                            <span style={{ color: '#FF6B00', fontWeight: 600 }}>
                              ${selectedEvent.price} {selectedEvent.currency}
                            </span>
                          ) : (
                            <span style={{ color: '#138808', fontWeight: 600 }}>
                              {t('FREE', 'GRATUIT')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>{t('First Name', 'Prénom')} *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          placeholder={t('John', 'Jean')}
                        />
                      </div>
                      <div className="form-group">
                        <label>{t('Last Name', 'Nom de Famille')} *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          placeholder={t('Doe', 'Dupont')}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>{t('Email', 'Courriel')} *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="email@example.com"
                      />
                    </div>

                    {/* Payment info for paid events */}
                    {isPaidEvent && (
                      <div
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(255, 107, 0, 0.05), rgba(255, 215, 0, 0.05))',
                          borderRadius: '12px',
                          padding: '16px',
                          marginBottom: '20px',
                          border: '1px solid rgba(255, 107, 0, 0.1)',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '8px',
                          }}
                        >
                          <span style={{ fontSize: '18px' }}>💳</span>
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: '14px',
                              fontWeight: 600,
                              color: '#1A1A2E',
                            }}
                          >
                            {t('Payment Required', 'Paiement Requis')}
                          </span>
                        </div>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '13px',
                            color: '#6B7280',
                            marginBottom: '12px',
                            lineHeight: 1.5,
                          }}
                        >
                          {t(
                            'After submitting the form, you will be directed to pay via PayPal.',
                            'Après avoir soumis le formulaire, vous serez dirigé vers PayPal pour le paiement.'
                          )}
                        </p>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '16px',
                            fontWeight: 600,
                            color: '#1A1A2E',
                          }}
                        >
                          <span>{t('Total', 'Total')}</span>
                          <span style={{ color: '#FF6B00' }}>
                            ${selectedEvent.price} {selectedEvent.currency}
                          </span>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="page-btn-primary"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        background: isPaidEvent
                          ? '#0070BA'
                          : undefined,
                      }}
                    >
                      {isPaidEvent
                        ? t(
                            'Submit & Proceed to PayPal',
                            'Soumettre et Passer à PayPal'
                          )
                        : t(
                            'Complete Registration',
                            "Compléter l'Inscription"
                          )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="tgif-footer">
        <div className="footer-container">
          <div className="footer-bottom">
            <p>
              © 2026 TGIF -{' '}
              {t('The Great India Festival', 'Le Grand Festival Indien')}.{' '}
              {t('All rights reserved.', 'Tous droits réservés.')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Registration;