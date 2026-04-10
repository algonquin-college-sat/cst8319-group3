import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useLanguage } from '../Context/LanguageContext';
import '../styles/pages.css';
import '../styles/footer.css';
import axios from 'axios';

interface Sponsor {
  id: number;
  name: string;
  type: 'gold' | 'silver' | 'bronze';
  descEn: string;
  descFr: string;
  image_url: string;
}

const Sponsors: React.FC = () => {
  const { t } = useLanguage();
  const [sponsors, setSponsors] = useState<Sponsor[]>([]); // Placeholder for sponsor data, can be fetched from an API

  

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/sponsor');// Replace with actual API endpoint
        setSponsors(res.data);
      } catch (err) {
        console.error(err);
      }
    }; fetchEvent();
   }, [])
   
  const goldSponsors = sponsors.filter((sponsor) => sponsor.type === 'gold');
  const silverSponsors = sponsors.filter((sponsor) => sponsor.type === 'silver');
  const bronzeSponsors = sponsors.filter((sponsor) => sponsor.type === 'bronze');
    
  const renderSponsorTier = (sponsorsList: Sponsor[], tier: string, icon: string, label_en: string, label_fr: string) => (
    <div className="sponsors-tier">
      <div className="sponsors-tier-header">
        <span className="tier-icon">{icon}</span>
        <h3>{t(label_en, label_fr)}</h3>
      </div>
      <div className="sponsors-grid">
        {sponsorsList.map((sponsor) => (
          <div key={sponsor.id} className={`sponsor-card ${tier}`}>
            <div className="sponsor-logo">{sponsor.image_url}</div>
            <div className="sponsor-info">
              <h4>{sponsor.name}</h4>
              <p>{t(sponsor.descEn, sponsor.descFr)}</p>
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
              © 2026 TGIF - {t('The Great India Festival', 'Le Grand Festival Indien')}. {t('All rights reserved.', 'Tous droits réservés.')}
            </p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Sponsors;