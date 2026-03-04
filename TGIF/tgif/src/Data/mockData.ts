// Mock data structured to match Spring Boot API response format
// All text fields have _en and _fr variants for bilingual support

export interface EventData {
  id: number;
  title_en: string;
  title_fr: string;
  description_en: string;
  description_fr: string;
  date: string; // ISO date string
  time: string;
  venue_en: string;
  venue_fr: string;
  event_type: 'paid' | 'unpaid';
  price: number | null;
  currency: string;
  registration_open: boolean;
  registration_opens_date: string;
  category_en: string;
  category_fr: string;
  image_url: string;
}

export interface SpeakerData {
  id: number;
  name: string;
  title_en: string;
  title_fr: string;
  bio_en: string;
  bio_fr: string;
  image_url: string;
  event_id: number;
  social_links: {
    instagram?: string;
    facebook?: string;
    website?: string;
  };
}

export const mockEvents: EventData[] = [
  {
    id: 1,
    title_en: 'Diwali Grand Celebration',
    title_fr: 'Grande Célébration de Diwali',
    description_en: 'Join us for a spectacular Diwali celebration featuring traditional performances, fireworks, and authentic Indian cuisine. Experience the festival of lights like never before!',
    description_fr: 'Rejoignez-nous pour une célébration spectaculaire de Diwali avec des spectacles traditionnels, des feux d\'artifice et une cuisine indienne authentique. Vivez la fête des lumières comme jamais!',
    date: '2026-03-15',
    time: '18:00',
    venue_en: 'Grand Convention Center, Toronto',
    venue_fr: 'Grand Centre de Congrès, Toronto',
    event_type: 'paid',
    price: 45.00,
    currency: 'CAD',
    registration_open: true,
    registration_opens_date: '2026-02-28',
    category_en: 'Cultural Festival',
    category_fr: 'Festival Culturel',
    image_url: 'https://mgx-backend-cdn.metadl.com/generate/images/995874/2026-02-28/f5b91a45-3bf9-4f0a-bbfb-86bcb15b08d3.png',
  },
  {
    id: 2,
    title_en: 'Classical Dance Workshop',
    title_fr: 'Atelier de Danse Classique',
    description_en: 'An immersive Bharatanatyam and Kathak dance workshop led by renowned choreographers. Open to all skill levels.',
    description_fr: 'Un atelier immersif de danse Bharatanatyam et Kathak dirigé par des chorégraphes renommés. Ouvert à tous les niveaux.',
    date: '2026-03-22',
    time: '14:00',
    venue_en: 'Community Arts Center, Montreal',
    venue_fr: 'Centre d\'Arts Communautaire, Montréal',
    event_type: 'unpaid',
    price: null,
    currency: 'CAD',
    registration_open: true,
    registration_opens_date: '2026-03-07',
    category_en: 'Workshop',
    category_fr: 'Atelier',
    image_url: 'https://mgx-backend-cdn.metadl.com/generate/images/995874/2026-02-28/a9cb1bc0-5eda-48e5-8bf9-7fece880241f.png',
  },
  {
    id: 3,
    title_en: 'Holi Color Festival',
    title_fr: 'Festival des Couleurs Holi',
    description_en: 'Celebrate the vibrant festival of colors with music, dance, organic colors, and delicious street food. A family-friendly event!',
    description_fr: 'Célébrez le vibrant festival des couleurs avec musique, danse, couleurs biologiques et délicieuse cuisine de rue. Un événement familial!',
    date: '2026-04-05',
    time: '11:00',
    venue_en: 'Riverside Park, Ottawa',
    venue_fr: 'Parc Riverside, Ottawa',
    event_type: 'paid',
    price: 25.00,
    currency: 'CAD',
    registration_open: false,
    registration_opens_date: '2026-03-21',
    category_en: 'Cultural Festival',
    category_fr: 'Festival Culturel',
    image_url: 'https://mgx-backend-cdn.metadl.com/generate/images/995874/2026-02-28/faf07977-1546-4aa7-a9cc-2c3b9ea80b16.png',
  },
  {
    id: 4,
    title_en: 'Indian Music Night',
    title_fr: 'Soirée Musique Indienne',
    description_en: 'An enchanting evening of Bollywood hits and classical ragas performed by talented musicians. Dinner included.',
    description_fr: 'Une soirée enchanteresse de succès Bollywood et de ragas classiques interprétés par des musiciens talentueux. Dîner inclus.',
    date: '2026-04-18',
    time: '19:00',
    venue_en: 'Royal Theatre, Vancouver',
    venue_fr: 'Théâtre Royal, Vancouver',
    event_type: 'paid',
    price: 60.00,
    currency: 'CAD',
    registration_open: false,
    registration_opens_date: '2026-04-03',
    category_en: 'Concert',
    category_fr: 'Concert',
    image_url: 'https://mgx-backend-cdn.metadl.com/generate/images/995874/2026-02-28/3fae966c-e2c9-4e5b-921e-e72274077d73.png',
  },
  {
    id: 5,
    title_en: 'Yoga & Meditation Retreat',
    title_fr: 'Retraite Yoga et Méditation',
    description_en: 'A peaceful day of yoga, meditation, and Ayurvedic wellness practices. Connect with your inner self.',
    description_fr: 'Une journée paisible de yoga, méditation et pratiques de bien-être ayurvédiques. Connectez-vous avec votre moi intérieur.',
    date: '2026-05-02',
    time: '08:00',
    venue_en: 'Serenity Gardens, Calgary',
    venue_fr: 'Jardins Sérénité, Calgary',
    event_type: 'unpaid',
    price: null,
    currency: 'CAD',
    registration_open: false,
    registration_opens_date: '2026-04-17',
    category_en: 'Wellness',
    category_fr: 'Bien-être',
    image_url: 'https://mgx-backend-cdn.metadl.com/generate/images/995874/2026-02-28/faf07977-1546-4aa7-a9cc-2c3b9ea80b16.png',
  },
  {
    id: 6,
    title_en: 'Indian Cuisine Masterclass',
    title_fr: 'Cours de Maître Cuisine Indienne',
    description_en: 'Learn to cook authentic Indian dishes from master chefs. Includes hands-on cooking and tasting session.',
    description_fr: 'Apprenez à cuisiner des plats indiens authentiques avec des chefs maîtres. Comprend une session de cuisine pratique et dégustation.',
    date: '2026-05-15',
    time: '10:00',
    venue_en: 'Culinary Institute, Toronto',
    venue_fr: 'Institut Culinaire, Toronto',
    event_type: 'paid',
    price: 35.00,
    currency: 'CAD',
    registration_open: false,
    registration_opens_date: '2026-04-30',
    category_en: 'Workshop',
    category_fr: 'Atelier',
    image_url: 'https://mgx-backend-cdn.metadl.com/generate/images/995874/2026-02-28/a9cb1bc0-5eda-48e5-8bf9-7fece880241f.png',
  },
];

export const mockSpeakers: SpeakerData[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    title_en: 'Classical Dance Maestro',
    title_fr: 'Maître de Danse Classique',
    bio_en: 'Award-winning Bharatanatyam dancer with over 20 years of experience performing on international stages. Priya has dedicated her life to preserving and promoting Indian classical dance forms.',
    bio_fr: 'Danseuse de Bharatanatyam primée avec plus de 20 ans d\'expérience sur les scènes internationales. Priya a consacré sa vie à la préservation et à la promotion des formes de danse classique indienne.',
    image_url: '/images/IndianDance.jpg',
    event_id: 2,
    social_links: {
      instagram: 'https://instagram.com',
      website: 'https://example.com',
    },
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    title_en: 'Sitar Virtuoso & Composer',
    title_fr: 'Virtuose du Sitar et Compositeur',
    bio_en: 'Internationally acclaimed sitar player who has performed at Carnegie Hall and Royal Albert Hall. Known for blending classical Indian music with contemporary sounds.',
    bio_fr: 'Joueur de sitar acclamé internationalement qui s\'est produit au Carnegie Hall et au Royal Albert Hall. Connu pour mélanger la musique classique indienne avec des sons contemporains.',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    event_id: 4,
    social_links: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
    },
  },
  {
    id: 3,
    name: 'Ananya Patel',
    title_en: 'Yoga & Wellness Expert',
    title_fr: 'Experte en Yoga et Bien-être',
    bio_en: 'Certified yoga instructor and Ayurvedic practitioner with a mission to bring holistic wellness to communities across Canada. Author of "The Mindful Path".',
    bio_fr: 'Instructrice de yoga certifiée et praticienne ayurvédique avec la mission d\'apporter le bien-être holistique aux communautés à travers le Canada. Auteure de "Le Chemin Conscient".',
    image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    event_id: 5,
    social_links: {
      instagram: 'https://instagram.com',
      website: 'https://example.com',
    },
  },
  {
    id: 4,
    name: 'Chef Vikram Singh',
    title_en: 'Celebrity Chef & Food Ambassador',
    title_fr: 'Chef Célèbre et Ambassadeur Culinaire',
    bio_en: 'Michelin-starred chef specializing in modern Indian cuisine. Featured on multiple cooking shows and author of three bestselling cookbooks.',
    bio_fr: 'Chef étoilé Michelin spécialisé dans la cuisine indienne moderne. Présenté dans plusieurs émissions de cuisine et auteur de trois livres de cuisine à succès.',
    image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    event_id: 6,
    social_links: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      website: 'https://example.com',
    },
  },
];