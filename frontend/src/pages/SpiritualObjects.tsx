import React from 'react';
import { Box } from '@mui/material';
import StuffCard from '../components/StuffCard';
import type { Stuff } from '../components/StuffCard';
import { useCart } from './CartPage';

// Example data for stuff
const stuffList: Stuff[] = [
  {
    id: 666,
    name: 'Mala de méditation',
    description: 'Perles sacrées pour la méditation et la prière.',
    price: 25,
    image: '',
    details: [
      { label: 'Type', value: 'Mala traditionnel' },
      { label: 'Utilisation', value: 'Méditation et yoga' },
    ],
  },
  {
    id: 667,
    name: 'Pierre de Quartz Rose',
    description: 'Pierre d’amour et de guérison émotionnelle.',
    price: 18,
    image: 'img/spiritual-objects/le-quartz-rose.webp',
    details: [
      { label: 'Type', value: 'Quartz rose naturel' },
      { label: 'Bienfaits', value: 'Favorise l’amour et la paix intérieure' },
    ],
  },
  {
    id: 668,
    name: 'Encens naturel',
    description: 'Purifiez votre espace avec des senteurs spirituelles.',
    price: 12,
    image: '',
    details: [
      { label: 'Type', value: 'Encens artisanal' },
      { label: 'Utilisation', value: 'Rituels et relaxation' },
    ],
  },
];

const SpiritualObjects: React.FC = () => {
  const { addToCart } = useCart();

  function addStuffToCart(stuff: Stuff) {
    addToCart({ ...stuff, details: stuff.details ?? [] });
  }

  return (
    <div className="container">
      <h1 className="main-title" style={{ textAlign: 'center', marginBottom: '1em' }}>
        Objets spirituels à découvrir
      </h1>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
        {stuffList.map((stuff) => (
          <StuffCard key={stuff.id} stuff={stuff} onBuy={addStuffToCart} />
        ))}
      </Box>
    </div>
  );
};

export default SpiritualObjects;
