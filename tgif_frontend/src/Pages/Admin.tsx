import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../Context/LanguageContext';
import axios from 'axios';
import '../styles/admin.css';
import '../styles/pages.css';
import authFetch from '../Utils/auth';
import UsersPage from "./User";
import Artist from './Artist';
import AdminSponsorPage from './AdminSponsorPage';


type Tab = 'dashboard' | 'events' | 'registrations' | 'volunteers' | 'users' |'artists'| 'sponsors';
interface EventItem {
  id: number;
  title_en: string;
  title_fr: string;
  description_en?: string;
  description_fr?: string;
  date: string;
  time: string;
  venue_en?: string;
  venue_fr?: string;
  event_type: string;
  price?: number | null;
  currency?: string;
  registration_open?: boolean;
  registration_opens_date?: string;
  category_en?: string;
  category_fr?: string;
  image_url?: string;
  [key: string]: any;
}

interface RegistrationItem {
  id: number;
  user_id: string;
  event_id: number;
  first_name: string;
  last_name: string;
  email: string;
  payment_status?: string;
  created_at?: string;
  event_title?: string;
}

interface VolunteerItem {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  availability?: string;
  experience?: string;
  reason: string;
  event: string;
}

interface DashboardStats {
  totalEvents: number;
  totalRegistrations: number;
  totalVolunteers: number;
  upcomingEvents: number;
}

const Admin: React.FC = () => {
  const { t, getField } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  // Data states
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationItem[]>([]);
  const [volunteers, setVolunteers] = useState<VolunteerItem[]>([]);
  const [filterEventId, setFilterEventId] = useState<number | null>(null);

  // Add event form
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [eventForm, setEventForm] = useState({
    title_en: '', title_fr: '', description_en: '', description_fr: '',
    date: '', time: '', venue_en: '', venue_fr: '',
    event_type: 'paid', price: '', currency: 'CAD',
    registration_open: true, registration_opens_date: '',
    category_en: '', category_fr: '', image_url: '',
  });
  const [submitting, setSubmitting] = useState(false);

  // Auth check
  useEffect(() => {
  const checkAuth = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await authFetch("http://localhost:8080/api/users/profile");

      if (!res) throw new Error();

      const user = await res.data;
      setUser(user);

    } catch {
      localStorage.removeItem("token");
    }

    setLoading(false);
  };

  checkAuth();
}, []);
  const handleLogin = async () => {
      window.location.href = "/login";
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  // Fetch data based on active tab
const fetchDashboard = useCallback(async () => {
  try {
    const res = await authFetch("http://localhost:8080/api/dashboard");
    console.log("Dashboard stats response:", res);

    setStats(res.data); // ✅ Axios uses res.data

  } catch (err) {
    console.error("Failed to fetch dashboard", err);
  }
}, []);

 const fetchEvents = useCallback(async () => {
  try {

    const res = await authFetch("http://localhost:8080/api/event");

    setEvents(Array.isArray(res.data) ? res.data : []);
    setStats((prev) => prev ? { ...prev, upcoming_events: res.data.filter((ev: EventItem) => new Date(ev.date).getTime() > new Date().getTime()).length } : prev);  
  } catch (err) {
    console.error("Failed to fetch events", err);
    setEvents([]); // fallback
  }
}, []);
 
  const fetchRegistrations = useCallback(async () => {
  try {

    const params: any = {};
    if (filterEventId) params.event_id = filterEventId;

    const res = await authFetch("http://localhost:8080/api/admin/registrations", {
      method: "GET",
      params
    });

    setRegistrations(Array.isArray(res.data) ? res.data : []);

  } catch (err) {
    console.error('Failed to fetch registrations:', err);
    setRegistrations([]); // fallback
  }
}, [filterEventId]);


  const fetchVolunteers = useCallback(async () => {
  
    const params: any = {};
  try {
    const res = await authFetch("http://localhost:8080/api/volunteer/all", {
      method: "GET",
      params
    });
    console.log("Volunteers response:", res);
    setVolunteers(res.data);

  } catch (err) {
    console.error('Failed to fetch volunteers:', err);
    setVolunteers([]); // fallback
  }
}, []);

  useEffect(() => {
    if (!user || user.role !== 'admin') return;
    if (activeTab === 'dashboard') {
      fetchDashboard();
      fetchEvents();
    } else if (activeTab === 'events') {
      fetchEvents();
    } else if (activeTab === 'registrations') {
      fetchRegistrations();
    } else if (activeTab === 'volunteers') {
      fetchVolunteers();
    } 
  }, [user, activeTab, fetchDashboard, fetchEvents, fetchRegistrations, fetchVolunteers]);

 const handleAddEvent = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitting(true);

  try {
    const data: any = { ...eventForm };

    if (data.price) data.price = parseFloat(data.price);
    else data.price = null;

    await authFetch("http://localhost:8080/api/events", {
      method: "POST",
      data
    });

    // ✅ Reset UI
    setShowAddEvent(false);

    setEventForm({
      title_en: '', title_fr: '', description_en: '', description_fr: '',
      date: '', time: '', venue_en: '', venue_fr: '',
      event_type: 'paid', price: '', currency: 'CAD',
      registration_open: true, registration_opens_date: '',
      category_en: '', category_fr: '', image_url: '',
    });

    // ✅ Refresh data
    fetchEvents();
    if (activeTab === 'dashboard') fetchDashboard();

  } catch (err: any) {
    console.error("Create event failed:", err);
    alert("Failed to create event");
  } finally {
    setSubmitting(false);
  }
};

  // Loading state
  if (loading) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="login-icon">⏳</div>
          <h2>{t('Loading...', 'Chargement...')}</h2>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="login-icon">🔐</div>
          <h2>{t('Admin Portal', 'Portail Admin')}</h2>
          <p>{t('Please sign in with your admin account to access the dashboard.', 'Veuillez vous connecter avec votre compte admin pour accéder au tableau de bord.')}</p>
          <button className="admin-login-btn" onClick={handleLogin}>
            {t('Sign In', 'Se Connecter')} →
          </button>
        </div>
      </div>
    );
  }

  // Not admin
  if (user.role !== 'admin') {
    return (
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="login-icon">⛔</div>
          <h2>{t('Access Denied', 'Accès Refusé')}</h2>
          <p>{t('You do not have admin privileges. Please contact an administrator.', 'Vous n\'avez pas les privilèges admin. Veuillez contacter un administrateur.')}</p>
          <button className="admin-login-btn" onClick={handleLogout}>
            {t('Sign Out', 'Se Déconnecter')}
          </button>
        </div>
      </div>
    );
  }

  const navItems: { key: Tab; icon: string; label_en: string; label_fr: string }[] = [
    { key: 'dashboard', icon: '📊', label_en: 'Dashboard', label_fr: 'Tableau de Bord' },
    { key: 'events', icon: '🎉', label_en: 'Events', label_fr: 'Événements' },
    { key: 'registrations', icon: '📋', label_en: 'Registrations', label_fr: 'Inscriptions' },
    { key: 'volunteers', icon: '🤝', label_en: 'Volunteers', label_fr: 'Bénévoles' },
    { key: 'users', icon: '👥', label_en: 'Users', label_fr: 'Utilisateurs' },
    { key: 'artists', icon: '🎭', label_en: 'Artists', label_fr: 'Artistes' },
    { key: 'sponsors', icon: '💼', label_en: 'Sponsors', label_fr: 'Commanditaires' }
  ];

  return (
    <div className="admin-page">
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <h2>🪔 TGIF</h2>
            <p>{t('Admin Panel', 'Panneau Admin')}</p>
          </div>
          <nav className="admin-nav">
            {navItems.map((item) => (
              <button
                key={item.key}
                className={`admin-nav-item ${activeTab === item.key ? 'active' : ''}`}
                onClick={() => { setActiveTab(item.key); setFilterEventId(null); }}
              >
                <span className="nav-icon">{item.icon}</span>
                {t(item.label_en, item.label_fr)}
              </button>
            ))}
          </nav>
          <button className="admin-logout-btn" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            {t('Sign Out', 'Se Déconnecter')}
          </button>
        </aside>

        {/* Content */}
        <main className="admin-content">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <>
              <div className="admin-content-header">
                <h1>{t('Dashboard', 'Tableau de Bord')}</h1>
                <p>{t('Overview of TGIF platform activity', 'Aperçu de l\'activité de la plateforme TGIF')}</p>
              </div>

              <div className="dashboard-stats-grid">
                <div className="dashboard-stat-card">
                  <div className="stat-icon">🎉</div>
                  <div className="stat-value">{stats?.totalEvents ?? '—'}</div>
                  <div className="stat-label">{t('Total Events', 'Total Événements')}</div>
                </div>
                <div className="dashboard-stat-card">
                  <div className="stat-icon">📅</div>
                  <div className="stat-value">{stats?.upcomingEvents ?? '—'}</div>
                  <div className="stat-label">{t('Upcoming Events', 'Événements à Venir')}</div>
                </div>
                <div className="dashboard-stat-card">
                  <div className="stat-icon">📋</div>
                  <div className="stat-value">{stats?.totalRegistrations ?? '—'}</div>
                  <div className="stat-label">{t('Registrations', 'Inscriptions')}</div>
                </div>
                <div className="dashboard-stat-card">
                  <div className="stat-icon">🤝</div>
                  <div className="stat-value">{stats?.totalVolunteers ?? '—'}</div>
                  <div className="stat-label">{t('Volunteers', 'Bénévoles')}</div>
                </div>
              </div>

              {/* Recent Events Table */}
              <div className="admin-table-container">
                <div className="admin-table-header">
                  <h3>{t('Recent Events', 'Événements Récents')}</h3>
                </div>
                {events.length > 0 ? (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>{t('Title', 'Titre')}</th>
                        <th>{t('Date', 'Date')}</th>
                        <th>{t('Type', 'Type')}</th>
                        <th>{t('Price', 'Prix')}</th>
                        <th>{t('Status', 'Statut')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.slice(0, 5).map((ev) => (
                        <tr key={ev.id}>
                          <td>{ev.id}</td>
                          <td>{t(ev.titleEn, ev.titleFr)}</td>
                          <td>{ev.date}</td>
                          <td>{ev.eventType}</td>
                          <td>{ev.price ? `$${ev.price} ${ev.currency}` : t('Free', 'Gratuit')}</td>
                          <td>
                            <span className={`status-badge ${ev.registrationOpen ? 'paid' : 'pending'}`}>
                              {ev.registrationOpen ? t('Open', 'Ouvert') : t('Closed', 'Fermé')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="admin-empty-state">
                    <div className="empty-icon">📭</div>
                    <p>{t('No events yet', 'Aucun événement pour le moment')}</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <>
              <div className="admin-content-header">
                <h1>{t('Manage Events', 'Gérer les Événements')}</h1>
                <p>{t('Create and manage TGIF events', 'Créer et gérer les événements TGIF')}</p>
              </div>

              <div style={{ marginBottom: 24 }}>
                <button
                  className="page-btn-primary"
                  onClick={() => setShowAddEvent(!showAddEvent)}
                >
                  {showAddEvent ? t('Cancel', 'Annuler') : t('+ Add New Event', '+ Ajouter un Événement')}
                </button>
              </div>

              {showAddEvent && (
                <div className="admin-form-card">
                  <h3>{t('Create New Event', 'Créer un Nouvel Événement')}</h3>
                  <form onSubmit={handleAddEvent}>
                    <div className="admin-form-grid">
                      <div className="form-group">
                        <label>{t('Title (English)', 'Titre (Anglais)')}</label>
                        <input type="text" required value={eventForm.title_en}
                          onChange={(e) => setEventForm({ ...eventForm, title_en: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>{t('Title (French)', 'Titre (Français)')}</label>
                        <input type="text" required value={eventForm.title_fr}
                          onChange={(e) => setEventForm({ ...eventForm, title_fr: e.target.value })} />
                      </div>
                      <div className="form-group full-width">
                        <label>{t('Description (English)', 'Description (Anglais)')}</label>
                        <textarea value={eventForm.description_en}
                          onChange={(e) => setEventForm({ ...eventForm, description_en: e.target.value })} />
                      </div>
                      <div className="form-group full-width">
                        <label>{t('Description (French)', 'Description (Français)')}</label>
                        <textarea value={eventForm.description_fr}
                          onChange={(e) => setEventForm({ ...eventForm, description_fr: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>{t('Date', 'Date')}</label>
                        <input type="date" required value={eventForm.date}
                          onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>{t('Time', 'Heure')}</label>
                        <input type="time" required value={eventForm.time}
                          onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>{t('Venue (English)', 'Lieu (Anglais)')}</label>
                        <input type="text" value={eventForm.venue_en}
                          onChange={(e) => setEventForm({ ...eventForm, venue_en: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>{t('Venue (French)', 'Lieu (Français)')}</label>
                        <input type="text" value={eventForm.venue_fr}
                          onChange={(e) => setEventForm({ ...eventForm, venue_fr: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>{t('Event Type', 'Type d\'Événement')}</label>
                        <select value={eventForm.event_type}
                          onChange={(e) => setEventForm({ ...eventForm, event_type: e.target.value })}>
                          <option value="paid">{t('Paid', 'Payant')}</option>
                          <option value="unpaid">{t('Free', 'Gratuit')}</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>{t('Price (CAD)', 'Prix (CAD)')}</label>
                        <input type="number" step="0.01" value={eventForm.price}
                          onChange={(e) => setEventForm({ ...eventForm, price: e.target.value })}
                          disabled={eventForm.event_type === 'unpaid'} />
                      </div>
                      <div className="form-group">
                        <label>{t('Category (English)', 'Catégorie (Anglais)')}</label>
                        <input type="text" value={eventForm.category_en}
                          onChange={(e) => setEventForm({ ...eventForm, category_en: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>{t('Category (French)', 'Catégorie (Français)')}</label>
                        <input type="text" value={eventForm.category_fr}
                          onChange={(e) => setEventForm({ ...eventForm, category_fr: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>{t('Registration Opens', 'Ouverture Inscriptions')}</label>
                        <input type="date" value={eventForm.registration_opens_date}
                          onChange={(e) => setEventForm({ ...eventForm, registration_opens_date: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>{t('Image URL', 'URL de l\'Image')}</label>
                        <input type="text" value={eventForm.image_url}
                          onChange={(e) => setEventForm({ ...eventForm, image_url: e.target.value })} />
                      </div>
                    </div>
                    <div className="admin-form-actions">
                      <button type="submit" className="page-btn-primary" disabled={submitting}>
                        {submitting ? t('Creating...', 'Création...') : t('Create Event', 'Créer l\'Événement')}
                      </button>
                      <button type="button" className="page-btn-secondary" onClick={() => setShowAddEvent(false)}>
                        {t('Cancel', 'Annuler')}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="admin-table-container">
                <div className="admin-table-header">
                  <h3>{t('All Events', 'Tous les Événements')} ({events.length})</h3>
                </div>
                {events.length > 0 ? (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>{t('Title', 'Titre')}</th>
                        <th>{t('Date', 'Date')}</th>
                        <th>{t('Venue', 'Lieu')}</th>
                        <th>{t('Type', 'Type')}</th>
                        <th>{t('Price', 'Prix')}</th>
                        <th>{t('Registration', 'Inscription')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((ev) => (
                        <tr key={ev.id}>
                          <td>{ev.id}</td>
                          <td>{t(ev.titleEn, ev.titleFr)}</td>
                          <td>{ev.date}</td>
                          <td>{t(ev.venueEn, ev.venueFr)}</td>
                          <td>{ev.eventType}</td>
                          <td>{ev.price ? `$${ev.price}` : t('Free', 'Gratuit')}</td>
                          <td>
                            <span className={`status-badge ${ev.registrationOpen ? 'paid' : 'pending'}`}>
                              {ev.registrationOpen? t('Open', 'Ouvert') : t('Closed', 'Fermé')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="admin-empty-state">
                    <div className="empty-icon">📭</div>
                    <p>{t('No events found', 'Aucun événement trouvé')}</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Registrations Tab */}
          {activeTab === 'registrations' && (
            <>
              <div className="admin-content-header">
                <h1>{t('Registration Report', 'Rapport des Inscriptions')}</h1>
                <p>{t('View all event registrations', 'Voir toutes les inscriptions aux événements')}</p>
              </div>

              <div className="admin-table-container">
                <div className="admin-table-header">
                  <h3>{t('Registrations', 'Inscriptions')} ({registrations.length})</h3>
                  <select
                    className="admin-filter-select"
                    value={filterEventId ?? ''}
                    onChange={(e) => setFilterEventId(e.target.value ? parseInt(e.target.value) : null)}
                  >
                    <option value="">{t('All Events', 'Tous les Événements')}</option>
                    {events.map((ev) => (
                      <option key={ev.id} value={ev.id}>{getField(ev, 'title')}</option>
                    ))}
                  </select>
                </div>
                {registrations.length > 0 ? (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>{t('Name', 'Nom')}</th>
                        <th>{t('Email', 'Courriel')}</th>
                        <th>{t('Event', 'Événement')}</th>
                        <th>{t('Payment', 'Paiement')}</th>
                        <th>{t('Date', 'Date')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((reg) => (
                        <tr key={reg.id}>
                          <td>{reg.id}</td>
                          <td>{reg.first_name} {reg.last_name}</td>
                          <td>{reg.email}</td>
                          <td>{reg.event_title || `Event #${reg.event_id}`}</td>
                          <td>
                            <span className={`status-badge ${reg.payment_status || 'pending'}`}>
                              {reg.payment_status || 'pending'}
                            </span>
                          </td>
                          <td>{reg.created_at ? new Date(reg.created_at).toLocaleDateString() : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="admin-empty-state">
                    <div className="empty-icon">📭</div>
                    <p>{t('No registrations found', 'Aucune inscription trouvée')}</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Volunteers Tab */}
          {activeTab === 'volunteers' && (
            <>
              <div className="admin-content-header">
                <h1>{t('Volunteer Report', 'Rapport des Bénévoles')}</h1>
                <p>{t('View all volunteer signups', 'Voir toutes les inscriptions de bénévoles')}</p>
              </div>

              <div className="admin-table-container">
                <div className="admin-table-header">
                  <h3>{t('Volunteers', 'Bénévoles')} ({volunteers.length})</h3>
                  <select
                    className="admin-filter-select"
                    value={filterEventId ?? ''}
                    onChange={(e) => setFilterEventId(e.target.value ? parseInt(e.target.value) : null)}
                  >
                    <option value="">{t('All Events', 'Tous les Événements')}</option>
                    {events.map((ev) => (
                      <option key={ev.id} value={ev.id}>{getField(ev, 'title')}</option>
                    ))}
                  </select>
                </div>
                {volunteers.length > 0 ? (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>{t('Name', 'Nom')}</th>
                        <th>{t('Email', 'Courriel')}</th>
                        <th>{t('Phone', 'Téléphone')}</th>
                        <th>{t('Role', 'Rôle')}</th>
                        <th>{t('Availability', 'Disponibilité')}</th>
                        <th>{t('Event', 'Événement')}</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {volunteers.map((vol) => (
                        <tr key={vol.id}>
                          <td>{vol.id}</td>
                          <td>{vol.name}</td>
                          <td>{vol.email}</td>
                          <td>{vol.phone || '—'}</td>
                          <td>{vol.role || '—'}</td>
                          <td>{vol.availability || '—'}</td>
                          <td>{vol.event || '— '}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="admin-empty-state">
                    <div className="empty-icon">📭</div>
                    <p>{t('No volunteers found', 'Aucun bénévole trouvé')}</p>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'users' && <UsersPage />}
          {activeTab === 'artists' && <Artist />}
          {activeTab === 'sponsors' && <AdminSponsorPage />}
        </main>
      </div>
    </div>
  );
};

export default Admin;