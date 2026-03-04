import React from 'react';
import Header from '../components/Header';
import { useLanguage } from '../Context/useLanguage';
import '../styles/pages.css';
import '../styles/footer.css';

const History: React.FC = () => {
  const { t } = useLanguage();

  const timelineItems = [
    {
      year: '2018',
      title_en: 'The Beginning',
      title_fr: 'Le Début',
      desc_en: 'TGIF was founded by a small group of passionate individuals in Toronto who wanted to share the beauty of Indian culture with the wider Canadian community. Our first event attracted 200 attendees.',
      desc_fr: 'TGIF a été fondé par un petit groupe de personnes passionnées à Toronto qui voulaient partager la beauté de la culture indienne avec la communauté canadienne. Notre premier événement a attiré 200 participants.',
    },
    {
      year: '2019',
      title_en: 'Growing Together',
      title_fr: 'Grandir Ensemble',
      desc_en: 'We expanded to 5 events across 3 cities — Toronto, Montreal, and Vancouver. Our Diwali celebration became the largest Indian cultural event in Ontario with over 2,000 attendees.',
      desc_fr: 'Nous nous sommes étendus à 5 événements dans 3 villes — Toronto, Montréal et Vancouver. Notre célébration de Diwali est devenue le plus grand événement culturel indien en Ontario avec plus de 2 000 participants.',
    },
    {
      year: '2020',
      title_en: 'Going Virtual',
      title_fr: 'Passage au Virtuel',
      desc_en: 'When the world paused, we pivoted to virtual events, hosting online cooking classes, dance workshops, and music concerts that reached audiences across the globe.',
      desc_fr: 'Quand le monde s\'est arrêté, nous avons pivoté vers des événements virtuels, organisant des cours de cuisine en ligne, des ateliers de danse et des concerts de musique qui ont touché des publics à travers le monde.',
    },
    {
      year: '2021',
      title_en: 'Hybrid Innovation',
      title_fr: 'Innovation Hybride',
      desc_en: 'We pioneered a hybrid event model, combining in-person gatherings with live streaming. This allowed us to serve both local and international audiences simultaneously.',
      desc_fr: 'Nous avons été pionniers d\'un modèle d\'événement hybride, combinant des rassemblements en personne avec la diffusion en direct. Cela nous a permis de servir simultanément des publics locaux et internationaux.',
    },
    {
      year: '2022',
      title_en: 'National Expansion',
      title_fr: 'Expansion Nationale',
      desc_en: 'TGIF expanded to 10 cities across Canada, partnering with local cultural organizations. We launched our volunteer program, welcoming over 200 dedicated volunteers.',
      desc_fr: 'TGIF s\'est étendu à 10 villes à travers le Canada, en partenariat avec des organisations culturelles locales. Nous avons lancé notre programme de bénévolat, accueillant plus de 200 bénévoles dévoués.',
    },
    {
      year: '2023',
      title_en: 'Award Recognition',
      title_fr: 'Reconnaissance par des Prix',
      desc_en: 'TGIF received the Canadian Multicultural Excellence Award for our contribution to cultural diversity. Our annual Holi festival was featured on national television.',
      desc_fr: 'TGIF a reçu le Prix d\'Excellence Multiculturelle Canadienne pour notre contribution à la diversité culturelle. Notre festival annuel de Holi a été présenté à la télévision nationale.',
    },
    {
      year: '2024',
      title_en: 'Community Impact',
      title_fr: 'Impact Communautaire',
      desc_en: 'We launched the TGIF Scholarship Fund for young artists and established partnerships with 15 universities. Over 10,000 people attended our events throughout the year.',
      desc_fr: 'Nous avons lancé le Fonds de Bourses TGIF pour les jeunes artistes et établi des partenariats avec 15 universités. Plus de 10 000 personnes ont assisté à nos événements tout au long de l\'année.',
    },
    {
      year: '2025',
      title_en: 'Looking Forward',
      title_fr: 'Regard vers l\'Avenir',
      desc_en: 'With 20+ events planned across Canada, new international partnerships, and our first-ever TGIF Music Festival, we continue to grow and inspire cultural connection.',
      desc_fr: 'Avec plus de 20 événements prévus à travers le Canada, de nouveaux partenariats internationaux et notre tout premier Festival de Musique TGIF, nous continuons à grandir et à inspirer la connexion culturelle.',
    },
  ];

  return (
    <div>
      <Header />

      {/* Hero */}
      <section className="page-hero">
        <div
          className="page-hero-bg"
          style={{ backgroundImage: 'url(https://mgx-backend-cdn.metadl.com/generate/images/995874/2026-02-28/d1a72fa9-2771-4c77-b02f-14f560b92e99.png)' }}
        />
        <div className="page-hero-content">
          <h1>{t('Our History', 'Notre Histoire')}</h1>
          <p>
            {t(
              'From a small gathering to a national celebration — the journey of The Great India Festival.',
              'D\'un petit rassemblement à une célébration nationale — le parcours du Grand Festival Indien.'
            )}
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="page-section">
        <div className="page-container">
          <div className="section-header">
            <div className="section-accent" />
            <h2>{t('Our Journey', 'Notre Parcours')}</h2>
            <p>
              {t(
                'A timeline of milestones that shaped TGIF into what it is today.',
                'Une chronologie des jalons qui ont façonné TGIF en ce qu\'il est aujourd\'hui.'
              )}
            </p>
          </div>

          <div className="history-timeline">
            {timelineItems.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h3>{t(item.title_en, item.title_fr)}</h3>
                  <p>{t(item.desc_en, item.desc_fr)}</p>
                </div>
              </div>
            ))}
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

export default History;