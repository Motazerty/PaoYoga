export type Pack = {
  id: number;
  name: string;
  price: number;
  description: string;
  videoThumbnail: string;
  details: { label: string; value: string }[];
};

export const yogaPacks: Pack[] = [
  {
    id: 1,
    name: 'Pack Débutant Zen',
    price: 15,
    description: 'Séances douces pour débuter en pleine conscience.',
    videoThumbnail:
      'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=400&q=80',
    details: [
      { label: 'Durée', value: '20 min' },
      { label: 'Niveau', value: 'Débutant' },
      { label: 'Bonus', value: 'Méditation guidée' },
    ],
  },
  {
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
  },
  {
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
  },
];

export const makeupPacks: Pack[] = [
  {
    id: 4,
    name: 'Pack Maquillage Naturel',
    price: 18,
    description: 'Techniques simples pour un look frais au quotidien.',
    videoThumbnail:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80',
    details: [
      { label: 'Durée', value: '25 min' },
      { label: 'Niveau', value: 'Débutant' },
      { label: 'Bonus', value: 'Guide produits naturels' },
    ],
  },
  {
    id: 5,
    name: 'Pack Soirée Glamour',
    price: 30,
    description: 'Looks sophistiqués pour vos sorties et événements.',
    videoThumbnail:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80',
    details: [
      { label: 'Durée', value: '45 min' },
      { label: 'Niveau', value: 'Intermédiaire' },
      { label: 'Bonus', value: 'Tutos exclusifs' },
    ],
  },
  {
    id: 6,
    name: 'Pack Maquillage Artistique',
    price: 35,
    description: 'Techniques créatives pour un maquillage unique.',
    videoThumbnail:
      'https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=400&q=80',
    details: [
      { label: 'Durée', value: '50 min' },
      { label: 'Niveau', value: 'Avancé' },
      { label: 'Bonus', value: 'Accès à la communauté' },
    ],
  },
];
