import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../Context/LanguageContext';
import '../styles/header.css';

interface NavLink {
  href: string;
  label_en: string;
  label_fr: string;
  isRoute: boolean;
}

const Header: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navLinks: NavLink[] = [
        { href: '/', label_en: 'Home', label_fr: 'Accueil', isRoute: true },
        { href: '/about', label_en: 'About', label_fr: 'À Propos', isRoute: true },
        { href: '/registration', label_en: 'Register', label_fr: 'Inscription', isRoute: true },
        { href: '/volunteer', label_en: 'Volunteer', label_fr: 'Bénévolat', isRoute: true },
        { href: '/history', label_en: 'History', label_fr: 'Histoire', isRoute: true },
        { href: '/sponsors', label_en: 'Sponsors', label_fr: 'Commanditaires', isRoute: true }, 
        { href: '/admin', label_en: '⚙️ Admin', label_fr: '⚙️ Admin', isRoute: true },
      ];

  return ( 
    <header className="tgif-header">
      <div className="header-container">
        <Link to="/" className="header-logo" style={{ textDecoration: 'none' }}>
          <span className="image_span"><img src="..\src\assets\Great-India-Festival.png"></img></span>
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