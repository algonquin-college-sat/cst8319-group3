import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useLanguage } from '../Context/LanguageContext';
import '../styles/pages.css';
import '../styles/footer.css';

interface Sponsor {
  name: string;
  desc_en: string;
  desc_fr: string;
  emoji: string;
}

const Sponsors: React.FC = () => {
  const { t } = useLanguage();

  const goldSponsors: Sponsor[] = [
    { name: 'Maple Spice Corp', desc_en: 'Canada\'s leading Indian spice and food brand', desc_fr: 'La marque indienne d\'épices et d\'alimentation leader au Canada', emoji: '🌶️' },
    { name: 'Royal Bank of Canada', desc_en: 'Proud supporter of cultural diversity', desc_fr: 'Fier soutien de la diversité culturelle', emoji: '🏦' },
    { name: 'Air India Canada', desc_en: 'Connecting cultures across continents', desc_fr: 'Connecter les cultures à travers les continents', emoji: '✈️' },
  ];

  const silverSponsors: Sponsor[] = [
    { name: 'Bollywood Studios', desc_en: 'Entertainment and media production', desc_fr: 'Production de divertissement et de médias', emoji: '🎬' },
    { name: 'Namaste Wellness', desc_en: 'Yoga and wellness products', desc_fr: 'Produits de yoga et de bien-être', emoji: '🧘' },
    { name: 'Desi Tech Solutions', desc_en: 'Technology consulting and services', desc_fr: 'Consultation et services technologiques', emoji: '💻' },
    { name: 'Saffron Textiles', desc_en: 'Traditional and modern Indian fashion', desc_fr: 'Mode indienne traditionnelle et moderne', emoji: '👗' },
  ];

  const bronzeSponsors: Sponsor[] = [
    { name: 'Chai & Co.', desc_en: 'Artisanal tea and beverages', desc_fr: 'Thé et boissons artisanaux', emoji: '☕' },
    { name: 'Rangoli Designs', desc_en: 'Interior design and decor', desc_fr: 'Design d\'intérieur et décoration', emoji: '🎨' },
    { name: 'Mumbai Street Eats', desc_en: 'Authentic Indian street food', desc_fr: 'Cuisine de rue indienne authentique', emoji: '🍛' },
    { name: 'Ganges Travel', desc_en: 'Travel and tourism services', desc_fr: 'Services de voyage et de tourisme', emoji: '🌍' },
    { name: 'Lotus Media', desc_en: 'Digital marketing agency', desc_fr: 'Agence de marketing numérique', emoji: '📱' },
  ];

  const renderSponsorTier = (sponsors: Sponsor[], tier: string, icon: string, label_en: string, label_fr: string) => (
    <div className="sponsors-tier">
      <div className="sponsors-tier-header">
        <span className="tier-icon">{icon}</span>
        <h3>{t(label_en, label_fr)}</h3>
      </div>
      <div className="sponsors-grid">
        {sponsors.map((sponsor, index) => (
          <div key={index} className={`sponsor-card ${tier}`}>
            <div className="sponsor-logo">{sponsor.emoji}</div>
            <div className="sponsor-info">
              <h4>{sponsor.name}</h4>
              <p>{t(sponsor.desc_en, sponsor.desc_fr)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
   <div>
      <Header />

      {/* Hero */}
      <section className="page-hero">
        <div
          className="page-hero-bg"
          style={{ backgroundImage: 'url(https://mgx-backend-cdn.metadl.com/generate/images/995874/2026-02-28/e8250459-a837-4c19-b67b-7d34697543d0.png)' }}
        />
        <div className="page-hero-content">
          <h1>{t('Our Sponsors', 'Nos Commanditaires')}</h1>
          <p>
            {t(
              'TGIF is made possible by the generous support of our sponsors and partners.',
              'TGIF est rendu possible grâce au généreux soutien de nos commanditaires et partenaires.'
            )}
          </p>
        </div>
      </section>

      {/* Sponsors List */}
      <section className="page-section">
        <div className="page-container">
          <div className="section-header">
            <div className="section-accent" />
            <h2>{t('Our Partners', 'Nos Partenaires')}</h2>
            <p>
              {t(
                'We are grateful to the organizations that help bring Indian culture to communities across Canada.',
                'Nous sommes reconnaissants envers les organisations qui aident à apporter la culture indienne aux communautés à travers le Canada.'
              )}
            </p>
          </div>

          {renderSponsorTier(goldSponsors, 'gold', '🥇', 'Gold Sponsors', 'Commanditaires Or')}
          {renderSponsorTier(silverSponsors, 'silver', '🥈', 'Silver Sponsors', 'Commanditaires Argent')}
          {renderSponsorTier(bronzeSponsors, 'bronze', '🥉', 'Bronze Sponsors', 'Commanditaires Bronze')}

          {/* CTA */}
          <div className="sponsors-cta">
            <h3>{t('Become a Sponsor', 'Devenir Commanditaire')}</h3>
            <p>
              {t(
                'Partner with TGIF and connect your brand with 15,000+ engaged attendees across Canada.',
                'Associez-vous à TGIF et connectez votre marque avec plus de 15 000 participants engagés à travers le Canada.'
              )}
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:sponsors@tgif.ca" className="page-btn-primary">
                {t('Contact Us', 'Contactez-Nous')}
              </a>
              <Link to="/about" className="page-btn-secondary" style={{ borderColor: '#FFFFFF', color: '#FFFFFF' }}>
                {t('Learn More', 'En Savoir Plus')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="tgif-footer">
        <div className="footer-container">
          <div className="footer-bottom">
            <p>
              © 2026 TGIF - {t('The Great India Festival', 'Le Grand Festival de l\'Inde')}. {t('All rights reserved.', 'Tous droits réservés.')}
            </p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Sponsors;