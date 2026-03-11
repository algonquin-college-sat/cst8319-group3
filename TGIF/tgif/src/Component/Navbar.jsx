import { Link } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>TGIF</h2>
      <Link to="/">Home</Link>
      <Link to="/events">Events</Link>
      <Link to="/calendar">Calendar</Link>
      <Link to="/gallery">Gallery</Link>
      <Link to="/about">About</Link>
      <Link to="/volunteer">Volunteers Registration</Link>
      <Link to="/artist">Artist Registration</Link>
      <LanguageToggle />
    </nav>
  );
}
