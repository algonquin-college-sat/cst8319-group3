
import React, { useState,useCallback, useEffect } from 'react';
import { useLanguage } from '../Context/LanguageContext';

interface SponsorItem {
  id: number | string;
  name: string;
  type: string;
  desc_en: string;
  desc_fr: string;
  image_url: string;
}

const AdminSponsorPage: React.FC = () => {
 
  const [sponsors, setSponsors] = useState<SponsorItem[]>([]);
  const [showSponsorForm, setShowSponsorForm] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<SponsorItem | null>(null);
  const [sponsorForm, setSponsorForm] = useState({ name: '', type: 'Gold', desc_en: '', desc_fr: '', image_url: '' });
  const [sponsorSubmitting, setSponsorSubmitting] = useState(false);
  const [sponsorDeleteConfirmId, setSponsorDeleteConfirmId] = useState<number | string | null>(null);
  const [sponsorSearchQuery, setSponsorSearchQuery] = useState('');
  const { t } = useLanguage();
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');
    // Sponsor CRUD handlers
  const handleSponsorFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setSponsorForm({ ...sponsorForm, [e.target.name]: e.target.value });
  };

  const resetSponsorForm = () => {
    setSponsorForm({ name: '', type: 'Gold', desc_en: '', desc_fr: '', image_url: '' });
    setEditingSponsor(null);
    setShowSponsorForm(false);
  };

  const handleCreateSponsor = async (e: React.FormEvent) => {
    e.preventDefault();
    setSponsorSubmitting(true);
    try {
      const res = await fetch('http://localhost:8080/api/sponsor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sponsorForm),
      });
      if (res.ok) {
        resetSponsorForm();
        fetchSponsors();
      } else {
        alert(t('Error creating sponsor', 'Erreur lors de la création du commanditaire'));
      }
    } catch {
      alert(t('Error creating sponsor', 'Erreur lors de la création du commanditaire'));
    } finally {
      setSponsorSubmitting(false);
    }
  };
  
    const fetchSponsors = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:8080/api/sponsor', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSponsors(Array.isArray(data) ? data : []);
      }
    } catch (err: any) {
      console.error('Failed to fetch sponsors:', err);
    }
    }, [token]);
    
    useEffect(() => {
    fetchSponsors();
    }, [fetchSponsors]);
    
  const handleEditSponsor = (s: SponsorItem) => {
    setEditingSponsor(s);
    setSponsorForm({ name: s.name, type: s.type, desc_en: s.desc_en, desc_fr: s.desc_fr, image_url: s.image_url });
    setShowSponsorForm(true);
  };

  const handleUpdateSponsor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSponsor) return;
    setSponsorSubmitting(true);
    try {
      const res = await fetch(`http://localhost:8080/api/sponsor/${editingSponsor.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sponsorForm),
      });
      if (res.ok) {
        resetSponsorForm();
        fetchSponsors();
      } else {
        alert(t('Error updating sponsor', 'Erreur lors de la mise à jour du commanditaire'));
      }
    } catch {
      alert(t('Error updating sponsor', 'Erreur lors de la mise à jour du commanditaire'));
    } finally {
      setSponsorSubmitting(false);
    }
  };

  const handleDeleteSponsor = async (id: number | string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/sponsors/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setSponsorDeleteConfirmId(null);
        fetchSponsors();
      } else {
        alert(t('Error deleting sponsor', 'Erreur lors de la suppression du commanditaire'));
      }
    } catch {
      alert(t('Error deleting sponsor', 'Erreur lors de la suppression du commanditaire'));
    }
  };

  const filteredSponsors = sponsors.filter((s) => {
    if (!sponsorSearchQuery) return true;
    const q = sponsorSearchQuery.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.type.toLowerCase().includes(q) || s.desc_en.toLowerCase().includes(q);
  });

  const getSponsorTypeColor = (type: string): string => {
    switch (type.toLowerCase()) {
      case 'platinum': return 'sponsor-platinum';
      case 'gold': return 'sponsor-gold';
      case 'silver': return 'sponsor-silver';
      case 'bronze': return 'sponsor-bronze';
      default: return 'sponsor-default';
    }
  };
  return (
   <>
              <div className="admin-content-header">
                <h1>{t('Sponsor Management', 'Gestion des Commanditaires')}</h1>
                <p>{t('Add, edit, and manage event sponsors', 'Ajouter, modifier et gérer les commanditaires')}</p>
              </div>

              {/* Action Bar */}
              <div className="users-action-bar">
                <div className="users-search-wrapper">
                  <span className="users-search-icon">🔍</span>
                  <input
                    type="text"
                    className="users-search-input"
                    placeholder={t('Search sponsors by name or tier...', 'Rechercher par nom ou niveau...')}
                    value={sponsorSearchQuery}
                    onChange={(e) => setSponsorSearchQuery(e.target.value)}
                  />
                  {sponsorSearchQuery && (
                    <button className="users-search-clear" onClick={() => setSponsorSearchQuery('')}>✕</button>
                  )}
                </div>
                <button
                  className="page-btn-primary"
                  onClick={() => {
                    if (showSponsorForm && !editingSponsor) {
                      resetSponsorForm();
                    } else {
                      setEditingSponsor(null);
                      setSponsorForm({ name: '', type: 'Gold', desc_en: '', desc_fr: '', image_url: '' });
                      setShowSponsorForm(true);
                    }
                  }}
                >
                  {showSponsorForm && !editingSponsor ? t('Cancel', 'Annuler') : t('+ Add New Sponsor', '+ Ajouter un Commanditaire')}
                </button>
              </div>

              {/* Add / Edit Sponsor Form */}
              {showSponsorForm && (
                <div className="admin-form-card user-form-card">
                  <div className="user-form-header">
                    <div className="user-form-icon">{editingSponsor ? '✏️' : '💎'}</div>
                    <div>
                      <h3>{editingSponsor ? t('Edit Sponsor', 'Modifier le Commanditaire') : t('Create New Sponsor', 'Créer un Nouveau Commanditaire')}</h3>
                      <p className="user-form-subtitle">
                        {editingSponsor
                          ? t('Update the sponsor information below', 'Mettez à jour les informations ci-dessous')
                          : t('Fill in the details to add a new sponsor', 'Remplissez les détails pour ajouter un commanditaire')}
                      </p>
                    </div>
                  </div>

                  <form onSubmit={editingSponsor ? handleUpdateSponsor : handleCreateSponsor}>
                    <div className="admin-form-grid">
                      <div className="form-group">
                        <label>
                          <span className="form-label-icon">🏢</span>
                          {t('Sponsor Name', 'Nom du Commanditaire')}
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder={t('e.g. Tech Corp', 'ex. Tech Corp')}
                          value={sponsorForm.name}
                          onChange={handleSponsorFormChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          <span className="form-label-icon">🏆</span>
                          {t('Sponsor Tier', 'Niveau de Commandite')}
                        </label>
                        <select name="type" value={sponsorForm.type} onChange={handleSponsorFormChange}>
                          <option value="Platinum">{t('Platinum', 'Platine')}</option>
                          <option value="Gold">{t('Gold', 'Or')}</option>
                          <option value="Silver">{t('Silver', 'Argent')}</option>
                          <option value="Bronze">{t('Bronze', 'Bronze')}</option>
                        </select>
                      </div>
                      <div className="form-group full-width">
                        <label>
                          <span className="form-label-icon">📝</span>
                          {t('Description (English)', 'Description (Anglais)')}
                        </label>
                        <textarea
                          name="desc_en"
                          placeholder={t('Leading technology sponsor supporting innovation.', 'Description en anglais...')}
                          value={sponsorForm.desc_en}
                          onChange={handleSponsorFormChange}
                          required
                        />
                      </div>
                      <div className="form-group full-width">
                        <label>
                          <span className="form-label-icon">📝</span>
                          {t('Description (French)', 'Description (Français)')}
                        </label>
                        <textarea
                          name="desc_fr"
                          placeholder={t('French description...', "Sponsor technologique de premier plan soutenant l'innovation.")}
                          value={sponsorForm.desc_fr}
                          onChange={handleSponsorFormChange}
                          required
                        />
                      </div>
                      <div className="form-group full-width">
                        <label>
                          <span className="form-label-icon">🖼️</span>
                          {t('Logo URL', 'URL du Logo')}
                        </label>
                        <input
                          type="url"
                          name="image_url"
                          placeholder="https://example.com/logo.png"
                          value={sponsorForm.image_url}
                          onChange={handleSponsorFormChange}
                          required
                        />
                      </div>
                      {sponsorForm.image_url && (
                        <div className="form-group full-width">
                          <label>{t('Logo Preview', 'Aperçu du Logo')}</label>
                          <div className="sponsor-logo-preview">
                            <img
                              src={sponsorForm.image_url}
                              alt="Preview"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="admin-form-actions">
                      <button type="submit" className="page-btn-primary" disabled={sponsorSubmitting}>
                        {sponsorSubmitting
                          ? (editingSponsor ? t('Updating...', 'Mise à jour...') : t('Creating...', 'Création...'))
                          : (editingSponsor ? t('Update Sponsor', 'Mettre à Jour') : t('Create Sponsor', 'Créer le Commanditaire'))}
                      </button>
                      <button type="button" className="page-btn-secondary" onClick={resetSponsorForm}>
                        {t('Cancel', 'Annuler')}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Sponsors Grid */}
              <div className="admin-table-container">
                <div className="admin-table-header">
                  <h3>{t('All Sponsors', 'Tous les Commanditaires')} ({filteredSponsors.length})</h3>
                  {sponsorSearchQuery && (
                    <span className="users-filter-badge">
                      {t('Filtered', 'Filtré')}: &quot;{sponsorSearchQuery}&quot;
                    </span>
                  )}
                </div>
                {filteredSponsors.length > 0 ? (
                  <div className="sponsors-card-grid">
                    {filteredSponsors.map((s) => (
                      <div key={s.id} className={`sponsor-admin-card ${getSponsorTypeColor(s.type)}`}>
                        <div className="sponsor-admin-card-header">
                          <div className="sponsor-admin-logo">
                            <img
                              src={s.image_url}
                              alt={s.name}
                              onError={(e) => { (e.target as HTMLImageElement).src = ''; (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                            <span className="sponsor-admin-logo-fallback">{s.name.charAt(0).toUpperCase()}</span>
                          </div>
                          <div className="sponsor-admin-info">
                            <h4>{s.name}</h4>
                            <span className={`sponsor-tier-badge ${getSponsorTypeColor(s.type)}`}>
                              {s.type === 'Platinum' ? '💎' : s.type === 'Gold' ? '🥇' : s.type === 'Silver' ? '🥈' : '🥉'} {s.type}
                            </span>
                          </div>
                        </div>
                        <p className="sponsor-admin-desc">{t(s.desc_en, s.desc_fr)}</p>
                        <div className="sponsor-admin-actions">
                          {sponsorDeleteConfirmId === s.id ? (
                            <div className="delete-confirm-group">
                              <span className="delete-confirm-text">{t('Delete?', 'Supprimer?')}</span>
                              <button className="user-action-btn user-action-danger" onClick={() => handleDeleteSponsor(s.id)}>
                                {t('Yes', 'Oui')}
                              </button>
                              <button className="user-action-btn user-action-cancel" onClick={() => setSponsorDeleteConfirmId(null)}>
                                {t('No', 'Non')}
                              </button>
                            </div>
                          ) : (
                            <>
                              <button className="user-action-btn user-action-edit" onClick={() => handleEditSponsor(s)} title={t('Edit', 'Modifier')}>
                                ✏️
                              </button>
                              <button className="user-action-btn user-action-delete" onClick={() => setSponsorDeleteConfirmId(s.id)} title={t('Delete', 'Supprimer')}>
                                🗑️
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="admin-empty-state">
                    <div className="empty-icon">{sponsorSearchQuery ? '🔍' : '💎'}</div>
                    <p>
                      {sponsorSearchQuery
                        ? t('No sponsors match your search', 'Aucun commanditaire ne correspond à votre recherche')
                        : t('No sponsors added yet', 'Aucun commanditaire ajouté')}
                    </p>
                  </div>
                )}
              </div>
            </>

  );
};

export default AdminSponsorPage;