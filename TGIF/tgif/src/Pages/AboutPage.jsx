import React from "react";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-bg" />
        <div className="hero-content">
          <h1>About The Great India Festival</h1>
          <p>Celebrating culture, community, and creativity since 2015.</p>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p className="mission-text">
          The Great India Festival (TGIFest) was born from a simple vision: to create a global stage
          for the breathtaking diversity of Indian arts and the spirit of collective joy. We believe
          that culture is the bridge that connects generations and communities.
        </p>

        <div className="mission-cards">
          <div className="mission-card">
            <div className="icon pink"></div>
            <h3>Community Impact</h3>
            <p>Supporting local artisans and bringing neighborhoods together through shared experiences.</p>
          </div>

          <div className="mission-card">
            <div className="icon yellow"></div>
            <h3>Artistic Purpose</h3>
            <p>Reviving traditional crafts while embracing bold innovations in contemporary art.</p>
          </div>
        </div>
      </section>

      {/* STORY TIMELINE */}
      <section className="story-section">
        <h2>Our Story</h2>
        <p className="story-subtitle">
          From a small gathering to a national phenomenon, follow our journey through the years.
        </p>

        <div className="timeline">
          <div className="timeline-item">
            <div className="circle">1</div>
            <h4>2015 — The Spark</h4>
            <p>Inaugural event in Jaipur with 10,000 attendees.</p>
          </div>

          <div className="timeline-item">
            <div className="circle">2</div>
            <h4>2018 — National Expansion</h4>
            <p>Grew to 5 major cities across India with 200+ artists.</p>
          </div>

          <div className="timeline-item">
            <div className="circle">3</div>
            <h4>2021 — Digital Evolution</h4>
            <p>Launched TGIFest Live, reaching millions globally.</p>
          </div>

          <div className="timeline-item">
            <div className="circle">4</div>
            <h4>2024 — Global Recognition</h4>
            <p>Voted Top 10 Cultural Festivals globally.</p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="what-section">
        <h2>What We Do</h2>

        <div className="what-cards">
          <div className="what-card">
            <div className="icon pink"></div>
            <h3>Cultural Performances</h3>
            <p>
              From classical Kathak and Sufi music to modern Bollywood-inspired indie pop, we bring
              the best of Indian sound and movement to the stage.
            </p>
          </div>

          <div className="what-card">
            <div className="icon yellow"></div>
            <h3>Community Engagement</h3>
            <p>
              Interactive workshops, food festivals, and family zones ensure that every visitor feels
              part of the vibrant tapestry of the festival.
            </p>
          </div>

          <div className="what-card">
            <div className="icon blue"></div>
            <h3>Artist Showcases</h3>
            <p>
              We provide a curated platform for emerging talents and established masters, fostering a
              marketplace of ideas and artistic commerce.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="team-section">
        <h2>Meet the Team</h2>
        <p className="team-subtitle">
          The passionate people driving the magic behind the festival.
        </p>

        <div className="team-grid">
          <div className="team-card">
            <h3>Arjun Mehta</h3>
            <p className="role">FESTIVAL DIRECTOR</p>
            <p className="bio">
              A visionary arts administrator with 20 years of experience in managing international
              cultural events and curating diversity.
            </p>
          </div>

          <div className="team-card">
            <h3>Priya Sharma</h3>
            <p className="role">HEAD OF PROGRAMMING</p>
            <p className="bio">
              Former curator at the National Centre for Performing Arts, Priya brings deep
              connections to India’s traditional art world.
            </p>
          </div>

          <div className="team-card">
            <h3>Rohan Gupta</h3>
            <p className="role">CREATIVE LEAD</p>
            <p className="bio">
              Award-winning designer focusing on immersive spatial experiences blending tradition
              with futuristic technology.
            </p>
          </div>

          <div className="team-card">
            <h3>Ananya Iyer</h3>
            <p className="role">COMMUNITY LIAISON</p>
            <p className="bio">
              Specializes in local outreach and sustainable tourism, ensuring the festival leaves a
              positive footprint on its host cities.
            </p>
          </div>
        </div>
      </section>

      {/* GET INVOLVED */}
      <section className="involved-section">
        <h2>Get Involved</h2>
        <p>The festival thrives on the energy of people like you. Join us in making history.</p>

        <div className="involved-buttons">
          <button>Volunteer</button>
          <button>Become an Artist</button>
          <button>Contact Us</button>
        </div>

        <div className="stats">
          <div className="stat"><span>🌐</span> 50+ Nations</div>
          <div className="stat"><span>📅</span> 12 Days of Joy</div>
          <div className="stat"><span>🏅</span> Top Global Event</div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
