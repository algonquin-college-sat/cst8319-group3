import React from 'react';
import { useLanguage } from '../Context/useLanguage';
import { mockSpeakers, mockEvents } from '../Data/mockData';
import '../styles/speakers.css';

const KeynoteSpeakers: React.FC = () => {
  const { t, getField } = useLanguage();

  const getEventForSpeaker = (eventId: number) => {
    return mockEvents.find((e) => e.id === eventId);
  };

  return (
    <section id="speakers" className="speakers-section">
      <div
        className="speakers-bg"
        style={{
          backgroundImage: `url(https://mgx-backend-cdn.metadl.com/generate/images/995874/2026-02-28/3fae966c-e2c9-4e5b-921e-e72274077d73.png)`,
        }}
      ></div>
      <div className="speakers-overlay"></div>
      <div className="section-container speakers-content">
        <div className="section-header section-header-light">
          <span className="section-tag section-tag-light">{t('Featured Artists & Speakers', 'Artistes et Conférenciers en Vedette')}</span>
          <h2 className="section-title section-title-light">
            {t('Meet Our Keynote Speakers', 'Rencontrez Nos Conférenciers')}
          </h2>
          <p className="section-description section-desc-light">
            {t(
              'Discover the talented artists, performers, and thought leaders who will grace our events.',
              'Découvrez les artistes talentueux, les interprètes et les leaders d\'opinion qui honoreront nos événements.'
            )}
          </p>
        </div>

        <div className="speakers-grid">
          {mockSpeakers.map((speaker) => {
            const event = getEventForSpeaker(speaker.event_id);
            return (
              <div key={speaker.id} className="speaker-card">
                <div className="speaker-image-wrapper">
                  <img
                    src={speaker.image_url}
                    alt={speaker.name}
                    className="speaker-image"
                  />
                  <div className="speaker-social">
                    {speaker.social_links.instagram && (
                      <a href={speaker.social_links.instagram} className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        📷
                      </a>
                    )}
                    {speaker.social_links.facebook && (
                      <a href={speaker.social_links.facebook} className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        📘
                      </a>
                    )}
                    {speaker.social_links.website && (
                      <a href={speaker.social_links.website} className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Website">
                        🌐
                      </a>
                    )}
                  </div>
                </div>
                <div className="speaker-info">
                  <h3 className="speaker-name">{speaker.name}</h3>
                  <p className="speaker-title">{getField(speaker, 'title')}</p>
                  <p className="speaker-bio">{getField(speaker, 'bio')}</p>
                  {event && (
                    <div className="speaker-event-tag">
                      <span className="event-tag-icon">🎪</span>
                      <span>{getField(event, 'title')}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeynoteSpeakers;