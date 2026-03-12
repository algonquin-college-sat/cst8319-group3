import { Link } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="navbar-logo-dot" />
          <span className="navbar-title">The Great India Festival</span>
        </div>

        <div className="navbar-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/events" className="nav-link">
            Events
          </Link>
          <Link to="/calendar" className="nav-link">
            Calendar
          </Link>
          <Link to="/gallery" className="nav-link">
            Gallery
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/volunteer" className="nav-link">
            Volunteer
          </Link>
          <Link to="/artist" className="nav-link">
            Call for Artists
          </Link>
        </div>

        <div className="navbar-lang">
          <LanguageToggle />
        </div>
      </nav>
    </header>
  );
}
