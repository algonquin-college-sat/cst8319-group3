# TGIF - Remaining Pages Development Plan

## Design Guidelines (consistent with existing)
- **Colors**: Saffron (#FF6B00), Gold (#FFD700), India Green (#138808), Deep Navy (#1A1A2E), Warm White (#FFF8F0)
- **Typography**: Playfair Display (headings) + Inter (body)
- **Style**: Indian festival theme, warm gradients, cultural motifs

## Images to Generate
1. **about-team-celebration.jpg** - Group of diverse people celebrating at an Indian cultural festival, warm lighting, joyful atmosphere (photorealistic)
2. **history-timeline-heritage.jpg** - Beautiful Indian heritage architecture with warm golden light, representing cultural history (photorealistic)
3. **sponsors-partnership.jpg** - Professional business partnership/handshake with Indian cultural elements in background (photorealistic)
4. **volunteer-community.jpg** - Diverse volunteers working together at a cultural event, smiling, community spirit (photorealistic)

## Files to Create/Modify

### New Pages (5 files)
1. **src/pages/About.tsx** - About Us page with mission, vision, team section, and stats
2. **src/pages/Registration.tsx** - Event registration page with event selection and registration form
3. **src/pages/History.tsx** - History/timeline page showing TGIF milestones
4. **src/pages/Sponsors.tsx** - Sponsors page with sponsor tiers (Gold, Silver, Bronze) and partnership CTA
5. **src/pages/Volunteer.tsx** - Volunteer page with roles, benefits, and sign-up form

### New Styles (1 file)
6. **src/styles/pages.css** - Shared styles for all new pages

### Modified Files
7. **src/App.tsx** - Add routes for new pages
8. **src/components/Header.tsx** - Update nav links to use React Router Link for page navigation