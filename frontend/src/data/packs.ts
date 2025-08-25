// Video type
export class Video {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  videoUrl: string;
  constructor({ id, title, thumbnail, description, videoUrl }: { id: number; title: string; thumbnail: string; description: string; videoUrl: string }) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.description = description;
    this.videoUrl = videoUrl;
  }
}

// Pack type
export class Pack {
  id: number;
  name: string;
  price: number;
  description: string;
  videoThumbnail: string;
  details: { label: string; value: string }[];
  videoIds: number[];
  constructor({ id, name, price, description, videoThumbnail, details, videoIds }: {
    id: number;
    name: string;
    price: number;
    description: string;
    videoThumbnail: string;
    details: { label: string; value: string }[];
    videoIds: number[];
  }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.videoThumbnail = videoThumbnail;
    this.details = details;
    this.videoIds = videoIds;
  }
}

// User type
export class User {
  email: string;
  purchasedPackIds: number[];
  constructor({ email, purchasedPackIds = [] }: { email: string; purchasedPackIds?: number[] }) {
    this.email = email;
    this.purchasedPackIds = purchasedPackIds;
  }
}

// Example video data
export const videos: Video[] = [
  new Video({
    id: 1,
    title: 'Yoga Fictif 2 - Séance 1',
    thumbnail: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    description: 'Séance d’introduction au yoga fictif.',
    videoUrl: 'https://www.example.com/video1.mp4',
  }),
  new Video({
    id: 2,
    title: 'Yoga Fictif 2 - Séance 2',
    thumbnail: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    description: 'Séance avancée pour la démonstration.',
    videoUrl: 'https://www.example.com/video2.mp4',
  }),
  new Video({
    id: 3,
    title: 'Séance Zen Matinale',
    thumbnail: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    description: 'Commencez la journée avec une séance zen.',
    videoUrl: 'https://www.example.com/video3.mp4',
  }),
  new Video({
    id: 4,
    title: 'Relaxation Profonde',
    thumbnail: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=400&q=80',
    description: 'Relaxation guidée pour le soir.',
    videoUrl: 'https://www.example.com/video4.mp4',
  }),
  new Video({
    id: 5,
    title: 'Flow Dynamique - Séance 1',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: 'Séance dynamique pour tous.',
    videoUrl: 'https://www.example.com/video5.mp4',
  }),
  new Video({
    id: 6,
    title: 'Flow Dynamique - Séance 2',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: 'Séance avancée de flow.',
    videoUrl: 'https://www.example.com/video6.mp4',
  }),
  new Video({
    id: 7,
    title: 'Méditation Relaxante',
    thumbnail: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=400&q=80',
    description: 'Méditation pour la détente profonde.',
    videoUrl: 'https://www.example.com/video7.mp4',
  }),
  new Video({
    id: 8,
    title: 'Respiration et Calme',
    thumbnail: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    description: 'Exercices de respiration pour le calme.',
    videoUrl: 'https://www.example.com/video8.mp4',
  }),
  new Video({
    id: 9,
    title: 'Beauté Naturelle - Routine',
    thumbnail: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    description: 'Routine beauté naturelle pour tous.',
    videoUrl: 'https://www.example.com/video9.mp4',
  }),
  new Video({
    id: 10,
    title: 'Maquillage Débutant',
    thumbnail: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80',
    description: 'Tuto maquillage pour débutants.',
    videoUrl: 'https://www.example.com/video10.mp4',
  }),
  new Video({
    id: 11,
    title: 'Soirée Glamour',
    thumbnail: 'https://cdn.pixabay.com/photo/2017/02/05/15/04/stones-2040340_1280.jpg',
    description: 'Préparez-vous pour une soirée glamour.',
    videoUrl: 'https://www.example.com/video11.mp4',
  }),
  new Video({
    id: 12,
    title: 'Beauté Artistique',
    thumbnail: 'https://cdn.pixabay.com/photo/2023/07/13/16/32/woman-8125236_1280.jpg',
    description: 'Techniques de beauté créative.',
    videoUrl: 'https://www.example.com/video12.mp4',
  }),
  new Video({
    id: 13,
    title: 'Massage Fictif',
    thumbnail: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=400&q=80',
    description: 'Massage fictif pour tester.',
    videoUrl: 'https://www.example.com/video13.mp4',
  }),
  new Video({
    id: 14,
    title: 'Massage Relaxant',
    thumbnail: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    description: 'Massage pour la détente.',
    videoUrl: 'https://www.example.com/video14.mp4',
  }),
  new Video({
    id: 15,
    title: 'Massage Sportif',
    thumbnail: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=400&q=80',
    description: 'Massage pour sportifs.',
    videoUrl: 'https://www.example.com/video15.mp4',
  }),
  new Video({
    id: 16,
    title: 'Massage Énergisant',
    thumbnail: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    description: 'Massage pour booster l’énergie.',
    videoUrl: 'https://www.example.com/video16.mp4',
  }),
  // More fake videos for testing
  new Video({
    id: 17,
    title: 'Yoga Avancé - Séance 1',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: 'Séance avancée de yoga.',
    videoUrl: 'https://www.example.com/video17.mp4',
  }),
  new Video({
    id: 18,
    title: 'Beauté Express',
    thumbnail: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    description: 'Routine beauté express.',
    videoUrl: 'https://www.example.com/video18.mp4',
  }),
  new Video({
    id: 19,
    title: 'Massage Dos',
    thumbnail: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=400&q=80',
    description: 'Massage du dos pour la relaxation.',
    videoUrl: 'https://www.example.com/video19.mp4',
  }),
];

// Example packs referencing videos by ID
export const yogaPacks: Pack[] = [
  new Pack({
    id: 102,
    name: 'Pack Yoga Fictif 2',
    price: 19,
    description: 'Un autre pack fictif pour la démonstration.',
    videoThumbnail: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    details: [
      { label: 'Durée', value: '25 min' },
      { label: 'Niveau', value: 'Démo' },
      { label: 'Bonus', value: 'Aucun' },
    ],
    videoIds: [1, 2],
  }),
  new Pack({
    id: 1,
    name: 'Pack Débutant Zen',
    price: 15,
    description: 'Séances douces pour débuter en pleine conscience.',
    videoThumbnail:
      'https://cdn.pixabay.com/photo/2023/10/14/09/19/meditation-8314420_1280.png',
    details: [
      { label: 'Durée', value: '20 min' },
      { label: 'Niveau', value: 'Débutant' },
      { label: 'Bonus', value: 'Méditation guidée' },
    ],
    videoIds: [3, 4],
  }),
  new Pack({
    id: 2,
    name: 'Pack Flow Dynamique',
    price: 25,
    description: 'Séances énergiques pour un yoga dynamique et fluide.',
    videoThumbnail:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    details: [
      { label: 'Durée', value: '40 min' },
      { label: 'Niveau', value: 'Intermédiaire' },
      { label: 'Bonus', value: 'Playlist exclusive' },
    ],
    videoIds: [5, 6],
  }),
  new Pack({
    id: 3,
    name: 'Pack Méditation & Relaxation',
    price: 20,
    description: 'Guides vidéo pour la méditation et la détente profonde.',
    videoThumbnail:
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=400&q=80',
    details: [
      { label: 'Durée', value: '30 min' },
      { label: 'Niveau', value: 'Tous niveaux' },
      { label: 'Bonus', value: 'Musique relaxante' },
    ],
    videoIds: [7, 8],
  }),
];

export const beautyPacks: Pack[] = [
  new Pack({
    id: 201,
    name: 'Pack Beauté Fictif',
    price: 16,
    description: 'Pack fictif beauté pour tester le panier.',
    videoThumbnail: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    details: [
      { label: 'Durée', value: '20 min' },
      { label: 'Niveau', value: 'Démo' },
      { label: 'Bonus', value: 'Aucun' },
    ],
    videoIds: [9],
  }),
  new Pack({
    id: 4,
    name: 'Pack Beauté Naturelle',
    price: 18,
    description: 'Techniques simples pour un look frais au quotidien.',
    videoThumbnail:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80',
    details: [
      { label: 'Durée', value: '25 min' },
      { label: 'Niveau', value: 'Débutant' },
      { label: 'Bonus', value: 'Guide produits naturels' },
    ],
    videoIds: [10],
  }),
  new Pack({
    id: 5,
    name: 'Pack Soirée Glamour',
    price: 30,
    description: 'Looks sophistiqués pour vos sorties et événements.',
    videoThumbnail:
      'https://cdn.pixabay.com/photo/2017/02/05/15/04/stones-2040340_1280.jpg',
    details: [
      { label: 'Durée', value: '45 min' },
      { label: 'Niveau', value: 'Intermédiaire' },
      { label: 'Bonus', value: 'Tutos exclusifs' },
    ],
    videoIds: [11],
  }),
  new Pack({
    id: 6,
    name: 'Pack Beauté Artistique',
    price: 35,
    description: 'Techniques créatives pour un maquillage unique.',
    videoThumbnail:
      'https://cdn.pixabay.com/photo/2023/07/13/16/32/woman-8125236_1280.jpg',
    details: [
      { label: 'Durée', value: '50 min' },
      { label: 'Niveau', value: 'Avancé' },
      { label: 'Bonus', value: 'Accès à la communauté' },
    ],
    videoIds: [12],
  }),
];

export const massagePacks: Pack[] = [
  {
    id: 301,
    name: 'Pack Massage Fictif',
    price: 14,
    description: 'Massage fictif pour tester la fonctionnalité.',
    videoThumbnail: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=400&q=80',
    details: [
      { label: 'Durée', value: '10 min' },
      { label: 'Type', value: 'Démo' },
      { label: 'Bonus', value: 'Aucun' },
  ],
    videoIds: [13],
  },
  {
    id: 7,
    name: 'Pack Massage Relaxant',
    price: 22,
    description: 'Techniques de massage pour la détente et le bien-être.',
    videoThumbnail:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    details: [
      { label: 'Durée', value: '30 min' },
      { label: 'Type', value: 'Relaxant' },
      { label: 'Bonus', value: 'Huile offerte' },
  ],
    videoIds: [14],
  },
  {
    id: 8,
    name: 'Pack Massage Sportif',
    price: 28,
    description: 'Massage pour récupération et performance sportive.',
    videoThumbnail:
      'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=400&q=80',
    details: [
      { label: 'Durée', value: '40 min' },
      { label: 'Type', value: 'Sportif' },
      { label: 'Bonus', value: 'Guide étirements' },
  ],
    videoIds: [15],
  },
  {
    id: 9,
    name: 'Pack Massage Énergisant',
    price: 26,
    description: 'Massage pour booster votre énergie et vitalité.',
    videoThumbnail:
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    details: [
      { label: 'Durée', value: '35 min' },
      { label: 'Type', value: 'Énergisant' },
      { label: 'Bonus', value: 'Playlist motivante' },
  ],
    videoIds: [16],
  },
];
