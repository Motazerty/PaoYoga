import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CardContainer from './CardContainer';

export type Stuff = {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  details?: { label: string; value: string }[];
};

type Props = {
  stuff: Stuff;
  onBuy?: (stuff: Stuff) => void;
};

const StuffCard: React.FC<Props> = ({ stuff, onBuy }) => {
  const [addedEffect, setAddedEffect] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  function handleBuy(e: React.MouseEvent) {
    e.stopPropagation();
    if (onBuy) {
      onBuy(stuff);
      setAddedEffect(true);
      setTimeout(() => setAddedEffect(false), 900);
    }
  }

  return (
    <CardContainer
      tabIndex={0}
      ariaLabel={`Produit ${stuff.name}, ${stuff.price} euros`}
      className="spiritual-card"
      onClick={() => {
        if (!infoOpen) setInfoOpen(true);
      }}
    >
  <Box className="card-image" sx={{ width: '100%', pt: '52%', position: 'relative', overflow: 'hidden', borderRadius: 5, boxShadow: '0 2px 14px rgba(123,31,162,0.13)' }}>
        <Box
          component="img"
          src={stuff.image || '/main-icon.svg'}
          alt={stuff.name}
          sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4, background: '#f3e5f5' }}
          onError={e => { (e.target as HTMLImageElement).src = '/main-icon.svg'; }}
        />
        <Box className="card-price" sx={{ position: 'absolute', top: 10, right: 10, bgcolor: '#fff', px: 1.7, py: 0.7, borderRadius: 99, fontWeight: 800, color: '#7B1FA2', fontSize: 16, boxShadow: '0 2px 8px rgba(123,31,162,0.13)' }}>
          {stuff.price}€
        </Box>
      </Box>
  <Box className="card-content" sx={{ p: '24px 22px 28px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: 0, minWidth: 0, bgcolor: '#fff', borderRadius: 5, boxShadow: '0 2px 8px rgba(123,31,162,0.09)' }}>
  <Typography variant="h6" className="card-title" sx={{ fontWeight: 900, fontSize: 23, color: '#6A1B9A', m: 0, letterSpacing: 0.7 }}>{stuff.name}</Typography>
  <Typography className="card-desc" sx={{ m: '16px 0 20px', color: '#37474F', fontSize: 17, lineHeight: 1.7, fontWeight: 500 }}>{stuff.description}</Typography>
        {stuff.details && (
          <Box className="card-details" sx={{ mb: 1, mt: 1 }}>
            {stuff.details.map(({ label, value }) => (
              <Box key={label} sx={{ fontSize: 16, color: '#7B1FA2', mb: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box component="span" sx={{ fontWeight: 700, minWidth: 70 }}>{label}:</Box> <Box component="span">{value}</Box>
              </Box>
            ))}
          </Box>
        )}
  <Box className="card-actions" sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 'auto', gap: 1.5 }}>
          {onBuy && (
            <Button
              onClick={handleBuy}
              aria-label={`Acheter le produit ${stuff.name}`}
              sx={{
                bgcolor: addedEffect ? '#4A148C' : '#7B1FA2',
                borderRadius: 6,
                px: 2.7,
                py: 1.2,
                color: 'white',
                fontWeight: 800,
                fontSize: 16,
                cursor: 'pointer',
                boxShadow: addedEffect ? '0 0 0 10px #7B1FA233' : 'none',
                transition: 'background-color 0.2s, box-shadow 0.3s, transform 0.2s',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 0.7,
                transform: addedEffect ? 'scale(1.09)' : 'none',
                '&:hover:not(:disabled)': { bgcolor: '#4A148C', transform: 'scale(1.04)' },
                '&:focus': { outline: '2px solid #7B1FA2' },
              }}
            >
              {addedEffect ? 'Ajouté !' : 'Acheter'}
            </Button>
          )}
        </Box>
        <Dialog
          open={infoOpen}
          onClose={() => {
            // Only close if not clicking the parent card
            setInfoOpen(false);
          }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: 900, color: '#7B1FA2', fontSize: 23 }}>{stuff.name}</DialogTitle>
          <DialogContent dividers>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <Box
                component="img"
                src={stuff.image || '/main-icon.svg'}
                alt={stuff.name}
                sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 4, boxShadow: '0 2px 8px rgba(123,31,162,0.13)', mb: 2, background: '#f3e5f5' }}
                onError={e => { (e.target as HTMLImageElement).src = '/main-icon.svg'; }}
              />
              <Typography sx={{ fontSize: 19, color: '#37474F', fontWeight: 700, textAlign: 'center', mb: 1 }}>{stuff.description}</Typography>
            </Box>
            {stuff.details && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#7B1FA2', mb: 2, fontSize: 18 }}>
                  Détails :
                </Typography>
                {stuff.details.map(({ label, value }) => (
                  <Box key={label} sx={{ fontSize: 17, color: '#6A1B9A', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box component="span" sx={{ fontWeight: 700, minWidth: 70 }}>{label}:</Box> <Box component="span">{value}</Box>
                  </Box>
                ))}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={e => { e.stopPropagation(); setInfoOpen(false); }} sx={{ color: '#7B1FA2', fontWeight: 900, fontSize: 17 }}>Fermer</Button>
          </DialogActions>
        </Dialog>
      </Box>
  </CardContainer>
  );
};

export default StuffCard;
