import { useEffect, useState } from "react";
import { useLanguage } from '../Context/LanguageContext';
import authFetch from '../Utils/auth';
import '../styles/admin.css';
import '../styles/pages.css';

interface UserItem {
  id: number | string;
  name: string;
  email: string;
  role: string;
}

export default function UsersPage() {


    const [users, setUsers] = useState([]);
    const { t, getField } = useLanguage();
    const [form, setForm] = useState({
        email: "",
        password: "",
        name: "",
        role: "user",
    });

    const [showUserForm, setShowUserForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userForm, setUserForm] = useState({ name: '', email: '', password: '', role: 'user' });
    const [userSubmitting, setUserSubmitting] = useState(false);
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | string | null>(null);
    const [userSearchQuery, setUserSearchQuery] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const token = localStorage.getItem("token");

    // 🔹 Decode JWT (simple check for role)
 

    // 🔹 Fetch all users
    const fetchUsers = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error();

            const data = await res.json();
            setUsers(data);
        } catch {
            alert("Error fetching users");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // 🔹 Handle form input
    const handleUserFormChange = (e) => {
        setUserForm({
            ...userForm,
            [e.target.name]: e.target.value,
        });
    };

    // ===============================
    // ✅ CREATE USER
    // ===============================
    const handleCreateUser = async (e) => {
        console.log("Creating user with data:", userForm);
        e.preventDefault();
        setUserSubmitting(true);

        try {
            const res = await fetch("http://localhost:8080/api/users/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(userForm)
            });

            if (!res.ok) throw new Error();

            resetUserForm();
            fetchUsers();
        } catch {
            alert(t('Error creating user', "Erreur lors de la création de l'utilisateur"));
        } finally {
            setUserSubmitting(false);
        }
    };

    // ===============================
    // ✅ EDIT USER
    // ===============================
    const handleEditUser = (u) => {
        setEditingUser(u);
        setUserForm({
            name: u.name,
            email: u.email,
            password: "",
            role: u.role,
        });
        setShowUserForm(true);
    };

    // ===============================
    // ✅ UPDATE USER
    // ===============================
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        if (!editingUser) return;

        setUserSubmitting(true);

        try {
            const body = {
                name: userForm.name,
                email: userForm.email,
                role: userForm.role,
                password: userForm.password ? userForm.password : undefined, // Only include if changed
            };


            const res = await fetch(
                `http://localhost:8080/api/users/${editingUser.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(body),
                }
            );

            if (!res.ok) throw new Error();

            resetUserForm();
            fetchUsers();
        } catch {
            alert(t('Error updating user', "Erreur lors de la mise à jour de l'utilisateur"));
        } finally {
            setUserSubmitting(false);
        }
    };

    // ===============================
    // ✅ DELETE USER
    // ===============================
    const handleDeleteUser = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/api/users/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error();

            setDeleteConfirmId(null);
            fetchUsers();
        } catch {
            alert(t('Error deleting user', "Erreur lors de la suppression de l'utilisateur"));
        }
    };
    const resetUserForm = () => {
        setUserForm({ name: '', email: '', password: '', role: 'user' });
        setEditingUser(null);
        setShowUserForm(false);
    };
    
    const filteredUsers = users.filter((u) => {
        if (!userSearchQuery) return true;

        const q = userSearchQuery.toLowerCase();

        return (
            u.name?.toLowerCase().includes(q) ||
            u.email?.toLowerCase().includes(q) ||
            u.role?.toLowerCase().includes(q)
        );
    });
   

    return (
        <>
        <div className="admin-content-header">
            <h1>{t('User Management', 'Gestion des Utilisateurs')}</h1>
            <p>{t('Add, edit, and manage user accounts', 'Ajouter, modifier et gérer les comptes utilisateurs')}</p>
        </div>

              {/* Action Bar */}
              <div className="users-action-bar">
                <div className="users-search-wrapper">
                  <span className="users-search-icon">🔍</span>
                  <input
                    type="text"
                    className="users-search-input"
                    placeholder={t('Search users by name, email, or role...', 'Rechercher par nom, courriel ou rôle...')}
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                  />
                  {userSearchQuery && (
                    <button className="users-search-clear" onClick={() => setUserSearchQuery('')}>✕</button>
                  )}
                </div>
                <button
                  className="page-btn-primary"
                  onClick={() => {
                    if (showUserForm && !editingUser) {
                      resetUserForm();
                    } else {
                      setEditingUser(null);
                      setUserForm({ name: '', email: '', password: '', role: 'user' });
                      setShowUserForm(true);
                    }
                  }}
                >
                  {showUserForm && !editingUser ? t('Cancel', 'Annuler') : t('+ Add New User', '+ Ajouter un Utilisateur')}
                </button>
              </div>

              {/* Add / Edit User Form */}
              {showUserForm && (
                <div className="admin-form-card user-form-card">
                  <div className="user-form-header">
                    <div className="user-form-icon">{editingUser ? '✏️' : '👤'}</div>
                    <div>
                      <h3>{editingUser ? t('Edit User', 'Modifier l\'Utilisateur') : t('Create New User', 'Créer un Nouvel Utilisateur')}</h3>
                      <p className="user-form-subtitle">
                        {editingUser
                          ? t('Update the user information below', 'Mettez à jour les informations ci-dessous')
                          : t('Fill in the details to create a new user account', 'Remplissez les détails pour créer un nouveau compte')}
                      </p>
                    </div>
                  </div>

                  <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser}>
                    <div className="admin-form-grid">
                      <div className="form-group">
                        <label>
                          <span className="form-label-icon">👤</span>
                          {t('Full Name', 'Nom Complet')}
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder={t('John Doe', 'Jean Dupont')}
                          value={userForm.name}
                          onChange={handleUserFormChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          <span className="form-label-icon">✉️</span>
                          {t('Email Address', 'Adresse Courriel')}
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="user@tgif.ca"
                          value={userForm.email}
                          onChange={handleUserFormChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          <span className="form-label-icon">🔒</span>
                          {editingUser ? t('New Password (optional)', 'Nouveau Mot de Passe (optionnel)') : t('Password', 'Mot de Passe')}
                        </label>
                        <input
                          type="password"
                          name="password"
                          placeholder="••••••••"
                          value={userForm.password}
                          onChange={handleUserFormChange}
                          required={!editingUser}
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          <span className="form-label-icon">🛡️</span>
                          {t('Role', 'Rôle')}
                        </label>
                        <select name="role" value={userForm.role} onChange={handleUserFormChange}>
                          <option value="user">{t('User', 'Utilisateur')}</option>
                          <option value="admin">{t('Admin', 'Administrateur')}</option>
                        </select>
                      </div>
                    </div>
                    <div className="admin-form-actions">
                      <button type="submit" className="page-btn-primary" disabled={userSubmitting}>
                        {userSubmitting
                          ? (editingUser ? t('Updating...', 'Mise à jour...') : t('Creating...', 'Création...'))
                          : (editingUser ? t('Update User', 'Mettre à Jour') : t('Create User', 'Créer l\'Utilisateur'))}
                      </button>
                      <button type="button" className="page-btn-secondary" onClick={resetUserForm}>
                        {t('Cancel', 'Annuler')}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Users Table */}
              <div className="admin-table-container">
                <div className="admin-table-header">
                  <h3>{t('All Users', 'Tous les Utilisateurs')} ({filteredUsers.length})</h3>
                  {userSearchQuery && (
                    <span className="users-filter-badge">
                      {t('Filtered', 'Filtré')}: &quot;{userSearchQuery}&quot;
                    </span>
                  )}
                </div>
                {filteredUsers.length > 0 ? (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>{t('Name', 'Nom')}</th>
                        <th>{t('Email', 'Courriel')}</th>
                        <th>{t('Role', 'Rôle')}</th>
                        <th style={{ textAlign: 'right' }}>{t('Actions', 'Actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((u) => (
                        <tr key={u.id}>
                          <td>
                            <span className="user-id-badge">#{u.id}</span>
                          </td>
                          <td>
                            <div className="user-cell-info">
                              <span className="user-name-text">{u.name}</span>
                            </div>
                          </td>
                          <td>{u.email}</td>
                          <td>
                            <span className={`status-badge ${u.role === 'admin' ? 'paid' : 'free'}`}>
                              {u.role === 'admin' ? t('Admin', 'Admin') : t('User', 'Utilisateur')}
                            </span>
                          </td>
                          <td>
                            <div className="user-actions">
                              {deleteConfirmId === u.id ? (
                                <div className="delete-confirm-group">
                                  <span className="delete-confirm-text">{t('Delete?', 'Supprimer?')}</span>
                                  <button className="user-action-btn user-action-danger" onClick={() => handleDeleteUser(u.id)}>
                                    {t('Yes', 'Oui')}
                                  </button>
                                  <button className="user-action-btn user-action-cancel" onClick={() => setDeleteConfirmId(null)}>
                                    {t('No', 'Non')}
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <button className="user-action-btn user-action-edit" onClick={() => handleEditUser(u)} title={t('Edit', 'Modifier')}>
                                    ✏️
                                  </button>
                                  <button className="user-action-btn user-action-delete" onClick={() => setDeleteConfirmId(u.id)} title={t('Delete', 'Supprimer')}>
                                    🗑️
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="admin-empty-state">
                    <div className="empty-icon">{userSearchQuery ? '🔍' : '👥'}</div>
                    <p>
                      {userSearchQuery
                        ? t('No users match your search', 'Aucun utilisateur ne correspond à votre recherche')
                        : t('No users found', 'Aucun utilisateur trouvé')}
                    </p>
                  </div>
                )}
              </div>
  </>
  );
}