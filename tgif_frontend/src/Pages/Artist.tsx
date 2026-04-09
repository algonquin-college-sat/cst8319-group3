import React, { useState } from 'react';
import '../styles/artist.css';
import axios from 'axios';

const initialFormData = {
  name: "",
  titleEn: "",
  titleFr: "",
  bioEn: "",
  bioFr: "",
  imageUrl: "",
  eventId: "",
  socialLink: {
    instagram: "",
    website: ""
  }
};

const Artist = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested socialLink fields
    if (name.includes('social_')) {
      const socialField = name.split('_')[1];
      setFormData(prev => ({
        ...prev,
        socialLink: {
          ...prev.socialLink,
          [socialField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/artist", formData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="performer-form">
        <h2>Create Artist Profile</h2>
        
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="row">
          <div className="form-group">
            <label>Title (English)</label>
            <input type="text" name="titleEn" value={formData.titleEn} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Title (French)</label>
            <input type="text" name="titleFr" value={formData.titleFr} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label>Bio (English)</label>
          <textarea name="bioEn" rows={4} value={formData.bioEn} onChange={handleChange}></textarea>
        </div>

        <div className="form-group">
          <label>Bio (French)</label>
          <textarea name="bioFr" rows={4} value={formData.bioFr} onChange={handleChange}></textarea>
        </div>

        <div className="row">
          <div className="form-group">
            <label>Image URL</label>
            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Event ID</label>
            <input type="number" name="eventId" value={formData.eventId} onChange={handleChange} />
          </div>
        </div>

        <fieldset className="social-section">
          <legend>Social Links</legend>
          <div className="row">
            <div className="form-group">
              <label>Instagram</label>
              <input type="url" name="social_instagram" value={formData.socialLink.instagram} onChange={handleChange} placeholder="https://..." />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input type="url" name="social_website" value={formData.socialLink.website} onChange={handleChange} placeholder="https://..." />
            </div>
          </div>
        </fieldset>

        <button type="submit" className="submit-btn">Create</button>
      </form>
    </div>
  );
};

export default Artist;