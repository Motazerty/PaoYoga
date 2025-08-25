
import React from 'react';
import { Box } from '@mui/material';
import { massagePacks, videos } from '../data/packs';
import PackCard from '../components/PackCard';
import { useCart } from './CartPage';

const Massage: React.FC = () => {
  const { addToCart } = useCart();
  return (
    <div className="container">
      <h1 className="main-title" style={{ textAlign: 'center', marginBottom: '1em' }}>
        Packs Massage disponibles
      </h1>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
        {massagePacks.map((pack) => (
          <PackCard key={pack.id} pack={pack} videos={videos} onBuy={addToCart} />
        ))}
      </Box>
  </div>
  );
};

export default Massage;
