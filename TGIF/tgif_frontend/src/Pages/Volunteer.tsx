import React, { useState } from 'react';
import Header from '../components/Header';
import { useLanguage } from '../Context/useLanguage';
import '../styles/pages.css';
import '../styles/footer.css';

const Volunteer: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    experience: '',
    availability: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const roles = [
    {
      icon: '🎪',
      title_en: 'Event Setup & Logistics',
      title_fr: 'Installation et Logistique',
      desc_en: 'Help set up venues, manage equipment, and ensure smooth event operations from start to finish.',
      desc_fr: 'Aidez à installer les lieux, gérer l\'équipement et assurer le bon déroulement des événements du début à la fin.',
    },
    {
      icon: '🎤',
      title_en: 'Stage & Performance',
      title_fr: 'Scène et Spectacle',
      desc_en: 'Assist with sound, lighting, backstage coordination, and performer support during live events.',
      desc_fr: 'Assistez avec le son, l\'éclairage, la coordination des coulisses et le soutien aux artistes pendant les événements en direct.',
    },
    {
      icon: '📸',
      title_en: 'Photography & Media',
      title_fr: 'Photographie et Médias',
      desc_en: 'Capture the magic of our events through photography, videography, and social media coverage.',
      desc_fr: 'Capturez la magie de nos événements à travers la photographie, la vidéographie et la couverture des médias sociaux.',
    },
    {
      icon: '🍽️',
      title_en: 'Food & Hospitality',
      title_fr: 'Alimentation et Hospitalité',
      desc_en: 'Coordinate food vendors, manage hospitality areas, and ensure guests have a wonderful dining experience.',
      desc_fr: 'Coordonnez les vendeurs de nourriture, gérez les zones d\'hospitalité et assurez une merveilleuse expérience culinaire aux invités.',
    },
    {
      icon: '🎨',
      title_en: 'Arts & Decoration',
      title_fr: 'Arts et Décoration',
      desc_en: 'Create beautiful rangoli, floral arrangements, and cultural decorations that bring our events to life.',
      desc_fr: 'Créez de beaux rangoli, des arrangements floraux et des décorations culturelles qui donnent vie à nos événements.',
    },
    {
      icon: '🤗',
      title_en: 'Guest Relations',
      title_fr: 'Relations avec les Invités',
      desc_en: 'Welcome attendees, provide information, assist with registration, and ensure everyone feels at home.',
      desc_fr: 'Accueillez les participants, fournissez des informations, aidez à l\'inscription et assurez-vous que tout le monde se sente chez soi.',
    },
  ];

  const benefits = [
    {
      icon: '🎟️',
      title_en: 'Free Event Access',
      title_fr: 'Accès Gratuit aux Événements',
      desc_en: 'Enjoy complimentary access to all TGIF events throughout the year.',
      desc_fr: 'Profitez d\'un accès gratuit à tous les événements TGIF tout au long de l\'année.',
    },
    {
      icon: '📜',
      title_en: 'Certificate of Recognition',
      title_fr: 'Certificat de Reconnaissance',
      desc_en: 'Receive an official volunteer certificate for your contributions.',
      desc_fr: 'Recevez un certificat officiel de bénévolat pour vos contributions.',
    },
    {
      icon: '👕',
      title_en: 'Exclusive Merchandise',
      title_fr: 'Marchandise Exclusive',
      desc_en: 'Get TGIF volunteer t-shirts, badges, and exclusive merchandise.',
      desc_fr: 'Obtenez des t-shirts, des badges et de la marchandise exclusive de bénévole TGIF.',
    },
    {
      icon: '🌐',
      title_en: 'Networking Opportunities',
      title_fr: 'Opportunités de Réseautage',
      desc_en: 'Connect with artists, performers, sponsors, and community leaders.',
      desc_fr: 'Connectez-vous avec des artistes, des interprètes, des commanditaires et des leaders communautaires.',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <Header />

      {/* Hero */}
      <section className="page-hero">
        <div
          className="page-hero-bg"
          style={{ backgroundImage: 'url(https://mgx-backend-cdn.metadl.com/generate/images/995874/2026-02-28/321b171d-8845-4592-a7ff-b5f313706f74.png)' }}
        />
        <div className="page-hero-content">
          <h1>{t('Volunteer With Us', 'Devenez Bénévole')}</h1>
          <p>
            {t(
              'Join our amazing team of volunteers and help create unforgettable cultural experiences.',
              'Rejoignez notre incroyable équipe de bénévoles et aidez à créer des expériences culturelles inoubliables.'
            )}
          </p>
        </div>
      </section>

      {/* Volunteer Roles */}
      <section className="page-section">
        <div className="page-container">
          <div className="section-header">
            <div className="section-accent" />
            <h2>{t('Volunteer Roles', 'Rôles de Bénévole')}</h2>
            <p>
              {t(
                'Choose a role that matches your skills and interests.',
                'Choisissez un rôle qui correspond à vos compétences et intérêts.'
              )}
            </p>
          </div>

          <div className="volunteer-roles-grid">
            {roles.map((role, index) => (
              <div key={index} className="page-card volunteer-role-card">
                <div className="role-icon">{role.icon}</div>
                <h3>{t(role.title_en, role.title_fr)}</h3>
                <p>{t(role.desc_en, role.desc_fr)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="page-section-alt">
        <div className="page-container">
          <div className="section-header">
            <div className="section-accent" />
            <h2>{t('Volunteer Benefits', 'Avantages du Bénévolat')}</h2>
            <p>
              {t(
                'We value our volunteers and offer great perks for your dedication.',
                'Nous valorisons nos bénévoles et offrons de grands avantages pour votre dévouement.'
              )}
            </p>
          </div>

          <div className="volunteer-benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="volunteer-benefit-item">
                <div className="benefit-icon">{benefit.icon}</div>
                <div>
                  <h4>{t(benefit.title_en, benefit.title_fr)}</h4>
                  <p>{t(benefit.desc_en, benefit.desc_fr)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign Up Form */}
      <section className="page-section">
        <div className="page-container">
          <div className="volunteer-form-section">
            <div className="section-header">
              <div className="section-accent" />
              <h2>{t('Sign Up to Volunteer', 'Inscrivez-vous comme Bénévole')}</h2>
              <p>
                {t(
                  'Fill out the form below and we\'ll get in touch with you.',
                  'Remplissez le formulaire ci-dessous et nous vous contacterons.'
                )}
              </p>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>🙏</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: '#1A1A2E', marginBottom: '12px' }}>
                  {t('Thank You for Signing Up!', 'Merci de Vous Être Inscrit!')}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#6B7280', marginBottom: '24px' }}>
                  {t(
                    'We\'ll review your application and contact you soon with next steps.',
                    'Nous examinerons votre candidature et vous contacterons bientôt avec les prochaines étapes.'
                  )}
                </p>
                <button className="page-btn-primary" onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', role: '', experience: '', availability: '', message: '' }); }}>
                  {t('Submit Another Application', 'Soumettre une Autre Candidature')}
                </button>
              </div>
            ) : (
              <div className="registration-form" style={{ maxWidth: '100%' }}>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>{t('Full Name', 'Nom Complet')} *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder={t('Your full name', 'Votre nom complet')} />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('Email', 'Courriel')} *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="email@example.com" />
                    </div>
                    <div className="form-group">
                      <label>{t('Phone', 'Téléphone')}</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 (416) 555-1234" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('Preferred Role', 'Rôle Préféré')} *</label>
                      <select name="role" value={formData.role} onChange={handleInputChange} required>
                        <option value="">{t('Select a role', 'Sélectionnez un rôle')}</option>
                        {roles.map((role, index) => (
                          <option key={index} value={role.title_en}>{t(role.title_en, role.title_fr)}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>{t('Availability', 'Disponibilité')} *</label>
                      <select name="availability" value={formData.availability} onChange={handleInputChange} required>
                        <option value="">{t('Select availability', 'Sélectionnez la disponibilité')}</option>
                        <option value="weekends">{t('Weekends Only', 'Fins de Semaine Seulement')}</option>
                        <option value="weekdays">{t('Weekdays Only', 'Jours de Semaine Seulement')}</option>
                        <option value="flexible">{t('Flexible', 'Flexible')}</option>
                        <option value="event-day">{t('Event Days Only', 'Jours d\'Événement Seulement')}</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>{t('Previous Volunteer Experience', 'Expérience de Bénévolat Antérieure')}</label>
                    <textarea name="experience" value={formData.experience} onChange={handleInputChange} placeholder={t('Tell us about your relevant experience...', 'Parlez-nous de votre expérience pertinente...')} />
                  </div>

                  <div className="form-group">
                    <label>{t('Why do you want to volunteer?', 'Pourquoi voulez-vous être bénévole?')}</label>
                    <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder={t('Share your motivation...', 'Partagez votre motivation...')} />
                  </div>

                  <button type="submit" className="page-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    {t('Submit Application', 'Soumettre la Candidature')}
                  </button>
                </form>
              </div>
            )}
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

export default Volunteer;