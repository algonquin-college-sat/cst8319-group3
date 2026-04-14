import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../Context/LanguageContext';
import { loginUser } from '../api/auth';
import '../styles/login.css';

const Login: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginUser({ email, password });
      console.log('JWT:', res.token);
      window.location.href = '/admin';
    } catch {
      setError(t('Invalid email or password. Please try again.', 'Courriel ou mot de passe invalide. Veuillez réessayer.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Decorative background */}
      <div className="login-bg-pattern">
        <div className="login-bg-circle login-bg-circle-1" />
        <div className="login-bg-circle login-bg-circle-2" />
        <div className="login-bg-circle login-bg-circle-3" />
      </div>

      <div className="login-container">
        {/* Left panel - branding */}
        <div className="login-branding">
          <div className="login-branding-content">
            <Link to="/" className="login-logo-link">
              <div className="login-logo">
                <span className="login-logo-icon">🪔</span>
                <span className="login-logo-text">TGIF</span>
              </div>
            </Link>
            <h1 className="login-branding-title">
              {t('The Great India Festival', 'Le Grand Festival Indien')}
            </h1>
            <p className="login-branding-subtitle">
              {t(
                'Access the admin dashboard to manage events, registrations, and more.',
                "Accédez au tableau de bord d'administration pour gérer les événements, les inscriptions et plus encore."
              )}
            </p>
            <div className="login-branding-features">
              <div className="login-feature-item">
                <span className="login-feature-icon">📊</span>
                <span>{t('Event Management', 'Gestion des événements')}</span>
              </div>
              <div className="login-feature-item">
                <span className="login-feature-icon">👥</span>
                <span>{t('Registration Tracking', 'Suivi des inscriptions')}</span>
              </div>
              <div className="login-feature-item">
                <span className="login-feature-icon">📈</span>
                <span>{t('Analytics & Reports', 'Analyses et rapports')}</span>
              </div>
            </div>
          </div>
          <div className="login-branding-footer">
            <p>© 2026 TGIF — {t('All rights reserved', 'Tous droits réservés')}</p>
          </div>
        </div>

        {/* Right panel - form */}
        <div className="login-form-panel">
          <div className="login-form-wrapper">
            <div className="login-form-header">
              <h2>{t('Welcome Back', 'Bon retour')}</h2>
              <p>{t('Sign in to your admin account', 'Connectez-vous à votre compte administrateur')}</p>
            </div>

            {error && (
              <div className="login-error">
                <span className="login-error-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="login-form">
              <div className="login-field">
                <label htmlFor="email">{t('Email Address', 'Adresse courriel')}</label>
                <div className="login-input-wrapper">
                  <span className="login-input-icon">✉️</span>
                  <input
                    id="email"
                    type="email"
                    placeholder={t('admin@tgif.ca', 'admin@tgif.ca')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="login-field">
                <div className="login-label-row">
                  <label htmlFor="password">{t('Password', 'Mot de passe')}</label>
                  <a href="#" className="login-forgot-link">
                    {t('Forgot password?', 'Mot de passe oublié?')}
                  </a>
                </div>
                <div className="login-input-wrapper">
                  <span className="login-input-icon">🔒</span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="login-toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={`login-submit-btn ${loading ? 'login-submit-loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <span className="login-spinner" />
                ) : null}
                <span>{loading ? t('Signing in...', 'Connexion...') : t('Sign In', 'Se connecter')}</span>
              </button>
            </form>

            <div className="login-divider">
              <span>{t('or', 'ou')}</span>
            </div>

            <Link to="/" className="login-back-home">
              ← {t('Back to Homepage', "Retour à l'accueil")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;