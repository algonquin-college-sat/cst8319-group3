import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { useLanguage } from "../i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo-dot" />
          <strong>{t("footer.brand")}</strong>
          <p className="footer-tagline">
            {t("footer.tagline")}
          </p>
          <div className="footer-social">
            <a href="#!" aria-label="Instagram">Instagram</a>
            <a href="#!" aria-label="Facebook">Facebook</a>
            <a href="#!" aria-label="YouTube">YouTube</a>
          </div>
        </div>

        <div className="footer-links">
          <h4>{t("footer.quickLinks")}</h4>
          <Link to="/">{t("nav.home")}</Link>
          <Link to="/events">{t("nav.events")}</Link>
          <Link to="/calendar">{t("nav.calendar")}</Link>
          <Link to="/gallery">{t("nav.gallery")}</Link>
          <Link to="/about">{t("nav.about")}</Link>
          <Link to="/volunteer">{t("nav.volunteer")}</Link>
          <Link to="/artist">{t("nav.artists")}</Link>
          <Link to="/sponsors">{t("nav.sponsors")}</Link>
        </div>

        <div className="footer-contact">
          <h4>{t("footer.contact")}</h4>
          <p>{t("footer.emailLabel")}: info@greatindiafestival.ca</p>
          <p>{t("footer.location")}</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {t("footer.brand")}. {t("footer.rights")}</p>
      </div>
    </footer>
  );
}
