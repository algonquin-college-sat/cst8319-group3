import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useLanguage } from '../Context/useLanguage';
import '../styles/pages.css';
import '../styles/footer.css';

const About: React.FC = () => {
  const { t } = useLanguage();

  const missionCards = [
    {
      icon: '🎭',
      title_en: 'Celebrate Culture',
      title_fr: 'Célébrer la Culture',
      desc_en: 'We bring the vibrant traditions, arts, and heritage of India to communities across Canada through immersive cultural experiences.',
      desc_fr: 'Nous apportons les traditions vibrantes, les arts et le patrimoine de l\'Inde aux communautés à travers le Canada grâce à des expériences culturelles immersives.',
    },
    {
      icon: '🤝',
      title_en: 'Build Community',
      title_fr: 'Bâtir la Communauté',
      desc_en: 'TGIF creates spaces where people from all backgrounds come together to share, learn, and celebrate the richness of Indian culture.',
      desc_fr: 'TGIF crée des espaces où des personnes de tous horizons se réunissent pour partager, apprendre et célébrer la richesse de la culture indienne.',
    },
    {
      icon: '🌏',
      title_en: 'Inspire Connection',
      title_fr: 'Inspirer la Connexion',
      desc_en: 'Through festivals, workshops, and performances, we foster cross-cultural understanding and lasting connections between communities.',
      desc_fr: 'À travers des festivals, des ateliers et des spectacles, nous favorisons la compréhension interculturelle et des connexions durables entre les communautés.',
    },
  ];

  const stats = [
    { number: '20+', label_en: 'Events Annually', label_fr: 'Événements Annuels' },
    { number: '15K+', label_en: 'Attendees', label_fr: 'Participants' },
    { number: '10+', label_en: 'Cities', label_fr: 'Villes' },
    { number: '8', label_en: 'Years Running', label_fr: 'Années d\'Existence' },
  ];

  const team = [
    { name: 'Arjun Mehta', role_en: 'Founder & Director', role_fr: 'Fondateur et Directeur', emoji: '👨‍💼' },
    { name: 'Sunita Rao', role_en: 'Events Manager', role_fr: 'Gestionnaire d\'Événements', emoji: '👩‍💼' },
    { name: 'Deepak Patel', role_en: 'Community Lead', role_fr: 'Responsable Communautaire', emoji: '🧑‍🤝‍🧑' },
    { name: 'Meera Joshi', role_en: 'Creative Director', role_fr: 'Directrice Créative', emoji: '🎨' },
  ];

  return (
    <div>
      <Header />

      {/* Hero */}
      <section className="page-hero">
        <div
          className="page-hero-bg"
          style={{ backgroundImage: 'url(https://mgx-backend-cdn.metadl.com/generate/images/995874/2026-02-28/bd49715a-a646-49e0-a143-a8788199a886.png)' }}
        />
        <div className="page-hero-content">
          <h1>{t('About TGIF', 'À Propos de TGIF')}</h1>
          <p>
            {t(
              'Celebrating the rich tapestry of Indian culture and bringing communities together since 2018.',
              'Célébrant la riche tapisserie de la culture indienne et rassemblant les communautés depuis 2018.'
            )}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="page-section">
        <div className="page-container">
          <div className="section-header">
            <div className="section-accent" />
            <h2>{t('Our Mission', 'Notre Mission')}</h2>
            <p>
              {t(
                'TGIF is dedicated to showcasing the beauty and diversity of Indian culture through world-class events and experiences.',
                'TGIF se consacre à mettre en valeur la beauté et la diversité de la culture indienne à travers des événements et des expériences de classe mondiale.'
              )}
            </p>
          </div>

          <div className="about-mission-grid">
            {missionCards.map((card, index) => (
              <div key={index} className="page-card about-mission-card">
                <div className="mission-icon">{card.icon}</div>
                <h3>{t(card.title_en, card.title_fr)}</h3>
                <p>{t(card.desc_en, card.desc_fr)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="page-section-alt">
        <div className="page-container">
          <div className="section-header">
            <div className="section-accent" />
            <h2>{t('TGIF by the Numbers', 'TGIF en Chiffres')}</h2>
          </div>
          <div className="about-stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="about-stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{t(stat.label_en, stat.label_fr)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="page-section">
        <div className="page-container">
          <div className="section-header">
            <div className="section-accent" />
            <h2>{t('Meet Our Team', 'Rencontrez Notre Équipe')}</h2>
            <p>
              {t(
                'The passionate people behind The Great India Festival.',
                'Les personnes passionnées derrière Le Grand Festival Indien.'
              )}
            </p>
          </div>
          <div className="about-team-grid">
            {team.map((member, index) => (
              <div key={index} className="page-card about-team-card">
                <div className="team-avatar">{member.emoji}</div>
                <h4>{member.name}</h4>
                <div className="team-role">{t(member.role_en, member.role_fr)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section-alt" style={{ textAlign: 'center' }}>
        <div className="page-container">
          <div className="section-header">
            <div className="section-accent" />
            <h2>{t('Join the Celebration', 'Rejoignez la Célébration')}</h2>
            <p>
              {t(
                'Be part of something extraordinary. Explore our events, volunteer, or become a sponsor.',
                'Faites partie de quelque chose d\'extraordinaire. Explorez nos événements, devenez bénévole ou commanditaire.'
              )}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/registration" className="page-btn-primary">{t('Register for Events', 'S\'inscrire aux Événements')}</Link>
            <Link to="/volunteer" className="page-btn-secondary">{t('Become a Volunteer', 'Devenir Bénévole')}</Link>
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
  );
};

export default About;