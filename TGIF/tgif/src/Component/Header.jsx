import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../Context/LanguageContext';
import '../styles/header.css';

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navLinks = isHomePage
    ? [
        { href: '#home', label_en: 'Home', label_fr: 'Accueil', isRoute: false },
        { href: '#events', label_en: 'Events', label_fr: 'Événements', isRoute: false },
        { href: '#speakers', label_en: 'Speakers', label_fr: 'Conférenciers', isRoute: false },
        { href: '#calendar', label_en: 'Calendar', label_fr: 'Calendrier', isRoute: false },
        { href: '/about', label_en: 'About', label_fr: 'À Propos', isRoute: true },
        { href: '/registration', label_en: 'Register', label_fr: 'Inscription', isRoute: true },
      ]
    : [
        { href: '/', label_en: 'Home', label_fr: 'Accueil', isRoute: true },
        { href: '/about', label_en: 'About', label_fr: 'À Propos', isRoute: true },
        { href: '/registration', label_en: 'Register', label_fr: 'Inscription', isRoute: true },
        { href: '/history', label_en: 'History', label_fr: 'Histoire', isRoute: true },
        { href: '/sponsors', label_en: 'Sponsors', label_fr: 'Commanditaires', isRoute: true },
        { href: '/volunteer', label_en: 'Volunteer', label_fr: 'Bénévole', isRoute: true },
      ];

  return (
    <header className="tgif-header">
      <div className="header-container">
        <Link to="/" className="header-logo" style={{ textDecoration: 'none' }}>
          <span className="logo-icon">🪔</span>
          <div className="logo-text">
            <span className="logo-title">TGIF</span>
            <span className="logo-subtitle">{t('The Great India Festival', 'Le Grand Festival Indien')}</span>
          </div>
        </Link>

        <nav className={`header-nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                className={`nav-link ${location.pathname === link.href ? 'nav-active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(link.label_en, link.label_fr)}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(link.label_en, link.label_fr)}
              </a>
            )
          )}
        </nav>

        <div className="header-actions">
          <button
            className="language-toggle"
            onClick={toggleLanguage}
            aria-label="Toggle language"
          >
            <span className={`lang-option ${language === 'en' ? 'lang-active' : ''}`}>EN</span>
            <span className="lang-divider">/</span>
            <span className={`lang-option ${language === 'fr' ? 'lang-active' : ''}`}>FR</span>
          </button>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${mobileMenuOpen ? 'hamburger-open' : ''}`}></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;