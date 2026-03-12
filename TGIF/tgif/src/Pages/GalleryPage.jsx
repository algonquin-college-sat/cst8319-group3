import React, { useState } from "react";
import "./GalleryPage.css";

// Placeholder gallery items (replace with API or client data later)
const GALLERY_YEARS = [2025, 2024, 2023, 2022];
const PLACEHOLDER_IMAGE = "https://placehold.co/400x300/f5f0ff/c41e5a?text=Festival+Photo";

function GalleryPage() {
  const [year, setYear] = useState(2025);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Mock items per year - replace with real data from backend
  const galleryItems = [
    { id: 1, src: PLACEHOLDER_IMAGE, caption: "Festival moment 1", year: 2025 },
    { id: 2, src: PLACEHOLDER_IMAGE, caption: "Festival moment 2", year: 2025 },
    { id: 3, src: PLACEHOLDER_IMAGE, caption: "Festival moment 3", year: 2025 },
    { id: 4, src: PLACEHOLDER_IMAGE, caption: "Festival moment 4", year: 2024 },
    { id: 5, src: PLACEHOLDER_IMAGE, caption: "Festival moment 5", year: 2024 },
    { id: 6, src: PLACEHOLDER_IMAGE, caption: "Festival moment 6", year: 2024 },
  ];

  const filteredItems = galleryItems.filter((item) => item.year === year);

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1>Festival Moments</h1>
        <p>Photos and memories from past editions of The Great India Festival.</p>
      </div>

      <div className="gallery-controls">
        <label htmlFor="gallery-year">Year:</label>
        <select
          id="gallery-year"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="gallery-year-select"
        >
          {GALLERY_YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <div className="gallery-grid">
        {filteredItems.length === 0 ? (
          <p className="gallery-empty">No photos for this year yet.</p>
        ) : (
          filteredItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="gallery-item"
              onClick={() => setLightboxImage(item)}
            >
              <img src={item.src} alt={item.caption} />
              <span className="gallery-item-caption">{item.caption}</span>
            </button>
          ))
        )}
      </div>

      {lightboxImage && (
        <div
          className="gallery-lightbox"
          onClick={() => setLightboxImage(null)}
          onKeyDown={(e) => e.key === "Escape" && setLightboxImage(null)}
          role="button"
          tabIndex={0}
          aria-label="Close lightbox"
        >
          <div className="gallery-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="gallery-lightbox-close"
              onClick={() => setLightboxImage(null)}
              aria-label="Close"
            >
              ×
            </button>
            <img src={lightboxImage.src} alt={lightboxImage.caption} />
            <p className="gallery-lightbox-caption">{lightboxImage.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryPage;
