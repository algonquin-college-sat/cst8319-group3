import { Link } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "../i18n/LanguageContext";

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="navbar-logo-dot" />
          <span className="navbar-title">The Great India Festival</span>
        </div>

        <div className="navbar-links">
          <Link to="/" className="nav-link">
            {t("nav.home")}
          </Link>
          <Link to="/events" className="nav-link">
            {t("nav.events")}
          </Link>
          <Link to="/calendar" className="nav-link">
            {t("nav.calendar")}
          </Link>
          <Link to="/gallery" className="nav-link">
            {t("nav.gallery")}
          </Link>
          <Link to="/about" className="nav-link">
            {t("nav.about")}
          </Link>
          <Link to="/volunteer" className="nav-link">
            {t("nav.volunteer")}
          </Link>
          <Link to="/artist" className="nav-link">
            {t("nav.artists")}
          </Link>
          <Link to="/sponsors" className="nav-link">
            {t("nav.sponsors")}
          </Link>
        </div>

        <div className="navbar-lang">
          <LanguageToggle />
        </div>
      </nav>
    </header>
  );
}
