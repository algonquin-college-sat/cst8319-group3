import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#FFF8F0',
      fontFamily: "'Inter', sans-serif",
      padding: '24px',
      textAlign: 'center',
    }}>
      <span style={{ fontSize: '64px', 
        position: "relative", left: "40px", top: "15px",
        marginBottom: '16px' }}><img src="..\src\assets\Great-India-Festival.png"></img></span>
      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '48px',
        fontWeight: 700,
        color: '#1A1A2E',
        marginBottom: '12px',
      }}>
        404
      </h1>
      <p style={{
        fontSize: '18px',
        color: '#6B7280',
        marginBottom: '32px',
      }}>
        {t('Page not found', 'Page non trouvée')}
      </p>
      <a
        href="/"
        style={{
          background: 'linear-gradient(135deg, #FF6B00, #FF8C00)',
          color: '#FFFFFF',
          padding: '12px 32px',
          borderRadius: '12px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '16px',
          transition: 'all 0.3s ease',
        }}
      >
        {t('Back to Home', 'Retour à l\'Accueil')}
      </a>
    </div>
  );
}