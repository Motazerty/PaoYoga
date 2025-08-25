// src/components/PackCard.tsx
import React, { useState } from 'react';
import { useCart } from '../pages/CartPage';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CardContainer from './CardContainer';


import { Pack, Video } from '../data/packs';

type Props = {
  pack: Pack;
  videos?: Video[];
  onBuy: (pack: Pack) => void;
};

const PackCard: React.FC<Props> = ({ pack, videos, onBuy }) => {
  const [hovered, setHovered] = useState(false);
  const [addedEffect, setAddedEffect] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const { cart } = useCart();
  const isInCart = cart.some((p) => p.id === pack.id);
  const videoList = videos ?? [];

  function handleBuy() {
    if (!isInCart) {
      onBuy(pack);
      setAddedEffect(true);
      setTimeout(() => setAddedEffect(false), 1200);
    }
  }

  function handleInfoOpen() {
    setInfoOpen(true);
  }
  function handleInfoClose() {
    setInfoOpen(false);
  }

  return (
    <CardContainer
      tabIndex={0}
      ariaLabel={`Pack ${pack.name}, ${pack.price} euros`}
      className="pack-card"
      onClick={() => {
        if (!infoOpen) {
          setHovered(false);
          handleInfoOpen();
        }
      }}
    >
  {/* Removed yoga icon for cleaner look */}
  <Box className="card-image" sx={{ width: '100%', pt: '40%', position: 'relative', overflow: 'hidden', borderRadius: 3, boxShadow: '0 2px 8px rgba(44,62,80,0.08)' }}>
        <Box component="img" src={pack.videoThumbnail} alt={`Vidéo du pack ${pack.name}`} sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2, transition: 'transform 0.4s ease', '&:hover, &:focus': { transform: 'scale(1.05)' } }} />
  <Box className="card-details-hover" sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, bgcolor: hovered ? 'rgba(56,142,60,0.7)' : 'transparent', color: 'white', display: hovered ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 2, fontSize: 14, lineHeight: 1.5, textAlign: 'center', opacity: hovered ? 1 : 0, pointerEvents: hovered ? 'auto' : 'none', transition: 'opacity 0.3s ease' }}>
          {pack.details.map(({ label, value }) => (
            <Box key={label} sx={{ mb: 1 }}>
              <strong>{label}:</strong> {value}
            </Box>
          ))}
        </Box>
      </Box>
  <Box className="card-content" sx={{ p: '22px 20px 26px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: 0, minWidth: 0, bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 8px rgba(44,62,80,0.08)' }}>
        <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="h6"
              className="card-title"
              sx={{
                fontFamily: '"Roboto", "Arial", sans-serif',
                fontWeight: 700,
                fontSize: 22,
                color: '#263238',
                m: 0,
                maxWidth: '100%',
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                letterSpacing: 0.5,
                lineHeight: 1.2,
              }}
            >
              {pack.name}
            </Typography>
        </Box>
        {/* Premium Level badge with icon, pill shape, gradient, and glow */}
        {pack.details.some(d => d.label.toLowerCase() === 'niveau' || d.label.toLowerCase() === 'level') && (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 1, mt: 1,
          }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.7,
                px: 1.5,
                py: 0.5,
                borderRadius: 999,
                fontSize: 15,
                fontWeight: 600,
                background: 'linear-gradient(90deg, #e0f7fa 0%, #b2ebf2 100%)',
                color: '#00897B',
                boxShadow: '0 1px 6px rgba(44,62,80,0.08)',
                letterSpacing: 0.7,
                border: '1.5px solid #26A69A',
                textTransform: 'uppercase',
                minWidth: 0,
                maxWidth: '70%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                transition: 'box-shadow 0.2s',
              }}
              title="Niveau du pack"
              aria-label="Niveau du pack"
            >
              {/* Simple Star icon SVG */}
              <Box component="span" sx={{ display: 'flex', alignItems: 'center', mr: 0.5 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2l1.6 4.6H14l-3.2 2.3L12.4 14 8 10.8 3.6 14l1.6-5.1L2 6.6h4.4L8 2z" fill="#FFD700" stroke="#00897B" strokeWidth="0.7"/>
                </svg>
              </Box>
              {pack.details.find(d => d.label.toLowerCase() === 'niveau' || d.label.toLowerCase() === 'level')?.value}
            </Box>
          </Box>
        )}
        <Box sx={{ minWidth: 0 }}>
          <Typography
            className="card-desc"
            sx={{
              m: '14px 0 18px',
              color: '#37474F',
              fontSize: 16,
              lineHeight: 1.6,
              flexGrow: 0,
              maxHeight: 60,
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              whiteSpace: 'normal',
              wordBreak: 'break-all',
              fontFamily: '"Roboto", "Arial", sans-serif',
            }}
          >
            {pack.description}
          </Typography>
        </Box>
  <Box className="card-actions" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', gap: 1.5 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 18, color: '#00897B', letterSpacing: 0.5 }}>{pack.price}€</Typography>
          {/* Info button removed, card click now opens modal */}
          <Button
            onClick={e => { e.stopPropagation(); handleBuy(); }}
            disabled={isInCart}
            aria-label={isInCart ? `Pack ${pack.name} déjà dans le panier` : `Acheter le pack ${pack.name}`}
            sx={{
              bgcolor: isInCart ? '#B2DFDB' : '#26A69A',
              borderRadius: 5,
              px: 2.5,
              py: 1,
              color: 'white',
              fontWeight: 700,
              fontSize: 15,
              cursor: isInCart ? 'not-allowed' : 'pointer',
              boxShadow: 'none',
              transition: 'background-color 0.2s, transform 0.2s',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: 0.7,
              ...(addedEffect && {
                animation: 'popAdded 0.7s',
                boxShadow: '0 0 0 6px #26A69A33',
                transform: 'scale(1.06)',
              }),
              '&:hover:not(:disabled)': { bgcolor: '#00897B', transform: 'scale(1.03)' },
              '&:focus': { outline: '2px solid #00897B' },
              '@keyframes popAdded': {
                '0%': { transform: 'scale(1)', boxShadow: '0 2px 8px rgba(38,166,154,0.12)' },
                '50%': { transform: 'scale(1.09)', boxShadow: '0 0 0 10px #26A69A22' },
                '100%': { transform: 'scale(1)', boxShadow: '0 2px 8px rgba(38,166,154,0.12)' },
              },
            }}
          >
            <Box component="span" sx={{ display: 'flex', alignItems: 'center', mr: 0.3 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="4" width="12" height="8" rx="2" fill="#fff" opacity="0.18" />
                <path d="M4 6h8M4 10h8M6 8h4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </Box>
            {isInCart ? 'Ajouté' : 'Acheter'}
          </Button>
        </Box>
        {/* Info Modal: List of videos with thumbnail, title, and description */}
        <Dialog
          open={infoOpen}
          onClose={handleInfoClose}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: 700, color: '#00897B', fontSize: 22 }}>{pack.name}</DialogTitle>
          <DialogContent dividers>
            <Typography sx={{ mb: 2, fontSize: 17, color: '#37474F', fontWeight: 500 }}>
              {pack.description}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#00897B', mb: 2 }}>
                Vidéos incluses dans ce pack:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {pack.videoIds && pack.videoIds.length > 0 && videoList.length > 0 ? (
                  pack.videoIds
                    .map(id => videoList.find((v: Video) => v.id === id))
                    .filter(Boolean)
                    .map((video) => (
                      <Box key={video!.id} sx={{ width: 220, bgcolor: '#f5f5f5', borderRadius: 3, boxShadow: '0 2px 8px rgba(44,62,80,0.08)', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box component="img" src={video!.thumbnail} alt={video!.title} sx={{ width: '100%', height: 110, objectFit: 'cover', borderRadius: 2, mb: 1 }} />
                        <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#263238', textAlign: 'center', mb: 0.5 }}>{video!.title}</Typography>
                        <Typography sx={{ fontSize: 14, color: '#37474F', textAlign: 'center' }}>{video!.description}</Typography>
                      </Box>
                    ))
                ) : (
                  <Typography sx={{ color: '#bdbdbd', fontStyle: 'italic' }}>Aucune vidéo dans ce pack.</Typography>
                )}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={e => { e.stopPropagation(); setHovered(false); handleInfoClose(); }} sx={{ color: '#00897B', fontWeight: 700 }}>Fermer</Button>
          </DialogActions>
        </Dialog>
      </Box>
  </CardContainer>
  );
};

export default PackCard;