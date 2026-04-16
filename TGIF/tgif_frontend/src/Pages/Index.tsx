import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import UpcomingEvents from '../components/UpcomingEvents';
import EventCalendar from '../components/EventCalendar';
import KeynoteSpeakers from '../components/KeynoteSpeakers';
import { useLanguage } from '../Context/LanguageContext';
import '../styles/footer.css';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="tgif-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="image_span"><img src="..\src\assets\Great-India-Festival.png"></img></span>
            </div>
            <p className="footer-brand-desc">
              {t(
                'The Great India Festival celebrates the rich tapestry of Indian culture, bringing communities together through music, dance, art, and cuisine.',
                'Le Grand Festival de l\'Inde célèbre la riche tapisserie de la culture indienne, rassemblant les communautés à travers la musique, la danse, l\'art et la cuisine.'
              )}
            </p>
            <div className="footer-social">
              <a href="https://www.instagram.com/tgifottawa" className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📷</a>
              <a href="https://www.facebook.com/groups/tgifOttawa" className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">📘</a>
              <a href="https://www.youtube.com/c/tgifottawa/videos" className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="YouTube">▶️</a>
            </div>
          </div>

          <div className="footer-column">
            <h4>{t('Quick Links', 'Liens Rapides')}</h4>
            <ul className="footer-links">
              <li><a href="#home">{t('Home', 'Accueil')}</a></li>
              <li><a href="#events">{t('Events', 'Événements')}</a></li>
              <li><a href="#speakers">{t('Speakers', 'Conférenciers')}</a></li>
              <li><a href="#calendar">{t('Calendar', 'Calendrier')}</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>{t('Pages', 'Pages')}</h4>
            <ul className="footer-links">
              <li><Link to="/about">{t('About Us', 'À Propos')}</Link></li>
              <li><Link to="/history">{t('History', 'Histoire')}</Link></li>
              <li><Link to="/sponsors">{t('Sponsors', 'Commanditaires')}</Link></li>
              <li><Link to="/volunteer">{t('Volunteer', 'Bénévole')}</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>{t('Contact', 'Contact')}</h4>
            <ul className="footer-links">
              <li><a href="mailto:info@tgif.ca">info@tgif.ca</a></li>
              <li><a href="tel:+14165551234">+1 (416) 555-1234</a></li>
              <li><Link to="/registration">{t('Register', 'Inscription')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2026 TGIF - {t('The Great India Festival', 'Le Grand Festival de l\'Inde')}. {t('All rights reserved.', 'Tous droits réservés.')} {t('Made with', 'Fait avec')} <span className="footer-bottom-heart">❤</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function LandingPage() {
  return (
    <div>
      <Header />
      <HeroSection />
      <UpcomingEvents />
      <EventCalendar />
      <KeynoteSpeakers />
      <Footer />
    </div>
  );
}