import React from 'react';
import { useLanguage } from '../Context/LanguageContext';
import '../styles/hero.css';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="hero-section">
      <div className="hero-overlay"></div>
      <div
        className="hero-background"
        style={{
          backgroundImage: `url(https://mgx-backend-cdn.metadl.com/generate/images/995874/2026-02-28/f5b91a45-3bf9-4f0a-bbfb-86bcb15b08d3.png)`,
        }}
      ></div>
      <div className="hero-content">
        <div className="hero-badge">
          <span>🪔</span>
          <span>{t('Celebrating Indian Culture', 'Célébrer la Culture Indienne')}</span>
        </div>
        <h1 className="hero-title">
          {t('The Great India', 'Le Grand')}
          <br />
          <span className="hero-title-accent">{t('Festival', 'Festival Indien')}</span>
        </h1>
        <p className="hero-description">
          {t(
            'Experience the vibrant tapestry of Indian culture through music, dance, art, and cuisine. Join us for unforgettable celebrations that bridge communities and honor traditions.',
            'Découvrez la tapisserie vibrante de la culture indienne à travers la musique, la danse, l\'art et la cuisine. Rejoignez-nous pour des célébrations inoubliables qui relient les communautés et honorent les traditions.'
          )}
        </p>
        <div className="hero-buttons">
          <a href="#events" className="hero-btn hero-btn-primary">
            {t('Explore Events', 'Explorer les Événements')}
          </a>
          <a href="#calendar" className="hero-btn hero-btn-secondary">
            {t('View Calendar', 'Voir le Calendrier')}
          </a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-number">20+</span>
            <span className="stat-label">{t('Events', 'Événements')}</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="stat-number">15K+</span>
            <span className="stat-label">{t('Attendees', 'Participants')}</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="stat-number">10+</span>
            <span className="stat-label">{t('Cities', 'Villes')}</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <span>{t('Scroll to explore', 'Défiler pour explorer')}</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default HeroSection;