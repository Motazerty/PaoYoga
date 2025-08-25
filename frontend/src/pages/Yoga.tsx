
import React from 'react';
import { Box } from '@mui/material';
import { yogaPacks, videos } from '../data/packs';
import PackCard from '../components/PackCard';
import { useCart } from './CartPage';

const Yoga: React.FC = () => {
  const { addToCart } = useCart();
  return (
    <div className="container" style={{ background: 'var(--background-color)', borderRadius: '8px', padding: '20px' }}>
      <h1 className="main-title" style={{ textAlign: 'center', marginBottom: '1em', color: 'var(--primary-color)' }}>
        Packs Yoga disponibles
      </h1>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
        {yogaPacks.map((pack) => (
          <PackCard key={pack.id} pack={pack} videos={videos} onBuy={addToCart} />
        ))}
      </Box>
  </div>
  );
};

export default Yoga;