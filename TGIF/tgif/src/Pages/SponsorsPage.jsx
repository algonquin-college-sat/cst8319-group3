import React from "react";
import "./SponsorsPage.css";

// Placeholder sponsor data - replace with API or client content
const SPONSORS = [
  { level: "Festival Partners", items: [{ name: "Partner 1", logo: null, description: "Supporting the festival." }] },
  { level: "Government & Institutional", items: [{ name: "Government of Canada", logo: null }, { name: "Algonquin College", logo: null }] },
  { level: "Community Partners", items: [{ name: "Community Partner 1", logo: null }, { name: "Community Partner 2", logo: null }] },
];

function SponsorsPage() {
  return (
    <div className="sponsors-page">
      <div className="sponsors-header">
        <h1>Our Sponsors & Partners</h1>
        <p>
          The Great India Festival is made possible with the support of our sponsors and community partners.
        </p>
      </div>

      {SPONSORS.map((section) => (
        <section key={section.level} className="sponsors-section">
          <h2>{section.level}</h2>
          <div className="sponsors-grid">
            {section.items.map((sponsor) => (
              <div key={sponsor.name} className="sponsor-card">
                {sponsor.logo ? (
                  <img src={sponsor.logo} alt={sponsor.name} className="sponsor-logo" />
                ) : (
                  <div className="sponsor-logo-placeholder">{sponsor.name.charAt(0)}</div>
                )}
                <h3>{sponsor.name}</h3>
                {sponsor.description && <p>{sponsor.description}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="sponsors-cta">
        <h2>Become a Sponsor</h2>
        <p>Interested in supporting the festival? Get in touch.</p>
        <a href="mailto:info@greatindiafestival.ca" className="sponsors-cta-btn">
          Contact Us
        </a>
      </section>
    </div>
  );
}

export default SponsorsPage;
