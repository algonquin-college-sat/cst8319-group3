import React from "react";
import { Link } from "react-router-dom";
import "./AboutPage.css";
import { useLanguage } from "../i18n/LanguageContext";

// Vibrant Indian festival / culture imagery (Pexels - royalty-free)
const IMG_HERO =
  "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1600";
const IMG_MISSION = `${process.env.PUBLIC_URL || ""}/about-mission.png`;
const IMG_CULTURAL = `${process.env.PUBLIC_URL || ""}/cultural-performances.png`;
const IMG_COMMUNITY =
  "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600";
const IMG_ARTISTS =
  "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600";

const AboutPage = () => {
  const { t } = useLanguage();
  return (
    <div className="about-page">
      {/* HERO */}
      <section className="ap-hero">
        <div className="ap-hero-bg" style={{ backgroundImage: `url(${IMG_HERO})` }} />
        <div className="ap-hero-overlay" />
        <div className="ap-hero-content">
          <h1>{t("about.heroTitle")}</h1>
          <p>{t("about.heroSubtitle")}</p>
        </div>
      </section>

      {/* MISSION */}
      <section className="ap-section ap-mission">
        <div className="ap-container">
          <div className="ap-mission-layout">
            <div className="ap-mission-text">
              <h2>{t("about.missionTitle")}</h2>
              <p className="ap-lead">{t("about.missionLead")}</p>
              <div className="ap-mission-cards">
                <div className="ap-mini-card">
                  <span className="ap-mini-icon ap-pink" />
                  <h3>{t("about.impactTitle")}</h3>
                  <p>{t("about.impactText")}</p>
                </div>
                <div className="ap-mini-card">
                  <span className="ap-mini-icon ap-orange" />
                  <h3>{t("about.purposeTitle")}</h3>
                  <p>{t("about.purposeText")}</p>
                </div>
              </div>
            </div>
            <div className="ap-mission-img">
              <img src={IMG_MISSION} alt="Indian culture and festival" />
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="ap-section ap-story">
        <div className="ap-container">
          <div className="ap-section-header">
            <h2>{t("about.storyTitle")}</h2>
            <p className="ap-subtitle">{t("about.storySubtitle")}</p>
          </div>
          <div className="ap-timeline">
            <div className="ap-timeline-item">
              <div className="ap-timeline-dot">1</div>
              <h4>2015 — The Spark</h4>
              <p>Inaugural event with thousands of attendees.</p>
            </div>
            <div className="ap-timeline-item">
              <div className="ap-timeline-dot">2</div>
              <h4>2018 — Growth</h4>
              <p>Expanded programming and artist line-up.</p>
            </div>
            <div className="ap-timeline-item">
              <div className="ap-timeline-dot">3</div>
              <h4>2021 — Digital Reach</h4>
              <p>Reaching audiences beyond the capital.</p>
            </div>
            <div className="ap-timeline-item">
              <div className="ap-timeline-dot">4</div>
              <h4>Today — Ottawa&apos;s Festival</h4>
              <p>A not-for-profit bringing Indian arts to everyone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO - with images */}
      <section className="ap-section ap-what">
        <div className="ap-container">
          <div className="ap-section-header">
            <h2>{t("about.whatTitle")}</h2>
            <p className="ap-subtitle">{t("about.whatSubtitle")}</p>
          </div>
          <div className="ap-what-grid">
            <div className="ap-what-card">
              <div className="ap-what-img">
                <img src={IMG_CULTURAL} alt="Cultural performances" />
              </div>
              <div className="ap-what-body">
                <h3>{t("about.performancesTitle")}</h3>
                <p>
                  {t("about.performancesText")}
                </p>
              </div>
            </div>
            <div className="ap-what-card">
              <div className="ap-what-img">
                <img src={IMG_COMMUNITY} alt="Community engagement" />
              </div>
              <div className="ap-what-body">
                <h3>{t("about.communityEngagementTitle")}</h3>
                <p>
                  {t("about.communityEngagementText")}
                </p>
              </div>
            </div>
            <div className="ap-what-card">
              <div className="ap-what-img">
                <img src={IMG_ARTISTS} alt="Artist showcases" />
              </div>
              <div className="ap-what-body">
                <h3>{t("about.artistShowcasesTitle")}</h3>
                <p>
                  {t("about.artistShowcasesText")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEET THE TEAM */}
      <section className="ap-section ap-team">
        <div className="ap-container">
          <div className="ap-section-header">
            <h2>{t("about.teamTitle")}</h2>
            <p className="ap-subtitle">{t("about.teamSubtitle")}</p>
          </div>
          <div className="ap-team-grid">
            <div className="ap-team-card">
              <h3>Arjun Mehta</h3>
              <p className="ap-role">Festival Director</p>
              <p className="ap-bio">Visionary arts administrator with experience in cultural events and curation.</p>
            </div>
            <div className="ap-team-card">
              <h3>Priya Sharma</h3>
              <p className="ap-role">Head of Programming</p>
              <p className="ap-bio">Deep connections to India&apos;s traditional art world and contemporary programming.</p>
            </div>
            <div className="ap-team-card">
              <h3>Rohan Gupta</h3>
              <p className="ap-role">Creative Lead</p>
              <p className="ap-bio">Immersive experiences blending tradition with modern design.</p>
            </div>
            <div className="ap-team-card">
              <h3>Ananya Iyer</h3>
              <p className="ap-role">Community Liaison</p>
              <p className="ap-bio">Local outreach and ensuring the festival leaves a positive footprint.</p>
            </div>
          </div>
        </div>
      </section>

      {/* GET INVOLVED */}
      <section className="ap-section ap-involved">
        <div className="ap-container">
          <div className="ap-section-header">
            <h2>{t("about.getInvolvedTitle")}</h2>
            <p className="ap-subtitle">{t("about.getInvolvedSubtitle")}</p>
          </div>
          <div className="ap-involved-buttons">
            <Link to="/volunteer" className="ap-btn ap-btn-primary">{t("landing.volunteerCta")}</Link>
            <Link to="/artist" className="ap-btn ap-btn-outline">{t("about.becomeArtist")}</Link>
            <Link to="/events" className="ap-btn ap-btn-ghost">{t("about.viewEvents")}</Link>
          </div>
          <div className="ap-stats">
            <div className="ap-stat"><span className="ap-stat-icon">🌐</span> 50+ Nations</div>
            <div className="ap-stat"><span className="ap-stat-icon">📅</span> Years of Joy</div>
            <div className="ap-stat"><span className="ap-stat-icon">🏅</span> Community Driven</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
