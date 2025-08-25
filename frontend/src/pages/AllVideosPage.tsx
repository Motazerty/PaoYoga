import React, { useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel } from '@mui/material';

import { User, yogaPacks, beautyPacks, massagePacks, videos as globalVideos } from '../data/packs';
import LockIcon from '@mui/icons-material/Lock';

type AllVideosPageProps = {
  user: User | null;
};

// Gather all videos from global array, with referencing packs info
const allPacks = [...yogaPacks, ...beautyPacks, ...massagePacks];
const allVideos = globalVideos.map(video => {
  const referencedPacks = allPacks.filter(pack => pack.videoIds && pack.videoIds.includes(video.id));
  return {
    ...video,
    referencedPacks,
    videos: [video], // add videos property containing the video itself
  };
});


const getDetail = (details: any, label: any) => {
  const found = details.find((d: any) => d.label.toLowerCase() === label.toLowerCase());
  return found ? found.value : '';
};

const AllVideosPage: React.FC<AllVideosPageProps> = ({ user }) => {
  const isAuthenticated = !!user;
  // Replace with real purchasedPackIds in production
  const purchasedPackIds = user ? [1, 102, 201, 301] : [];

  // Filter states
  const [search, setSearch] = useState('');
  const [length, setLength] = useState('');
  const [type, setType] = useState('');
  const [level, setLevel] = useState('');
  const [owned, setOwned] = useState(false);

  // Get unique lengths, types, levels from all referenced packs' details
  const lengths = Array.from(new Set(allVideos.flatMap(v => v.referencedPacks.map(p => getDetail(p.details, 'Durée'))).filter(Boolean)));
  const types = Array.from(new Set(allVideos.flatMap(v => v.referencedPacks.map(p => getDetail(p.details, 'Type'))).filter(Boolean)));
  const levels = Array.from(new Set(allVideos.flatMap(v => v.referencedPacks.map(p => getDetail(p.details, 'Niveau'))).filter(Boolean)));

  // Filtering logic
  const filteredVideos = allVideos.filter(video => {
    // Search by name, description, or referenced pack name
    const matchesSearch =
      video.title.toLowerCase().includes(search.toLowerCase()) ||
      video.description.toLowerCase().includes(search.toLowerCase()) ||
      video.referencedPacks.some(p => p.name.toLowerCase().includes(search.toLowerCase()));
    // Length
    const matchesLength = length ? video.referencedPacks.some(p => getDetail(p.details, 'Durée') === length) : true;
    // Type
    const matchesType = type ? video.referencedPacks.some(p => getDetail(p.details, 'Type') === type) : true;
    // Level
    const matchesLevel = level ? video.referencedPacks.some(p => getDetail(p.details, 'Niveau') === level) : true;
    // Owned
    const matchesOwned = owned ? video.referencedPacks.some(p => purchasedPackIds.includes(p.id)) : true;
    return matchesSearch && matchesLength && matchesType && matchesLevel && matchesOwned;
  });

  return (
    <Box sx={{ display: 'flex', maxWidth: 1400, mx: 'auto', p: 3 }}>
      {/* Sidebar */}
      <Box
        sx={{
          position: 'fixed',
          top: '64px', // height of navbar
          left: 0,
          bottom: '80px', // height of footer
          width: '15%',
          bgcolor: 'var(--surface-color)',
          borderRight: '1px solid var(--accent-color)',
          boxShadow: '2px 0 12px rgba(0,0,0,0.06)',
          px: 3,
          py: 4,
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
        className="card"
      >
  <Typography variant="h6" sx={{ mb: 2, color: 'var(--primary-color)', fontWeight: 800, fontSize: '1.3rem', letterSpacing: 1 }} className="main-title">Filtres</Typography>
        <TextField
          label="Recherche"
          variant="outlined"
          value={search}
          onChange={e => setSearch(e.target.value)}
          fullWidth
          sx={{ mb: 2, background: 'var(--background-color)', borderRadius: 'var(--border-radius)', fontFamily: 'var(--font-family)' }}
          InputProps={{ style: { fontFamily: 'var(--font-family)' } }}
          className="input"
        />
  <FormControl fullWidth sx={{ mb: 2 }} className="input">
          <InputLabel sx={{ color: 'var(--accent-color)' }}>Durée</InputLabel>
          <Select value={length} label="Durée" onChange={e => setLength(e.target.value)} sx={{ background: 'var(--surface-color)' }}>
            <MenuItem value="">Toutes</MenuItem>
            {lengths.map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
          </Select>
        </FormControl>
  <FormControl fullWidth sx={{ mb: 2 }} className="input">
          <InputLabel sx={{ color: 'var(--accent-color)' }}>Type</InputLabel>
          <Select value={type} label="Type" onChange={e => setType(e.target.value)} sx={{ background: 'var(--surface-color)' }}>
            <MenuItem value="">Tous</MenuItem>
            {types.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </Select>
        </FormControl>
  <FormControl fullWidth sx={{ mb: 2 }} className="input">
          <InputLabel sx={{ color: 'var(--accent-color)' }}>Niveau</InputLabel>
          <Select value={level} label="Niveau" onChange={e => setLevel(e.target.value)} sx={{ background: 'var(--surface-color)' }}>
            <MenuItem value="">Tous</MenuItem>
            {levels.map(lv => <MenuItem key={lv} value={lv}>{lv}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControlLabel
          control={<Checkbox checked={owned} onChange={e => setOwned(e.target.checked)} sx={{ color: 'var(--primary-color)' }} />}
          label={<span style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Mes vidéos (achetées)</span>}
          sx={{ mb: 2 }}
        />
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => {
            setSearch(''); setLength(''); setType(''); setLevel(''); setOwned(false);
          }}
          sx={{
            borderColor: 'var(--accent-color)',
            color: 'var(--accent-color)',
            fontWeight: 700,
            background: 'var(--background-color)',
            borderRadius: 'var(--border-radius)',
            mt: 1,
            '&:hover': { background: 'var(--accent-color)', color: '#fff' },
          }}
          className="button"
        >
          Réinitialiser
        </Button>
      </Box>
  {/* Videos */}
  <Box sx={{ flex: 1, ml: '260px', pt: '64px', pb: '80px', pl: 4, display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center', minHeight: 'calc(100vh - 64px - 80px)' }} className="container flex">
        {filteredVideos.length > 0 ? filteredVideos.map(video => (
          <Card key={video.id} sx={{ width: 260, position: 'relative', boxShadow: '0 2px 8px rgba(44,62,80,0.08)', borderRadius: 'var(--border-radius)', background: 'var(--surface-color)' }} className="card">
            <CardMedia
              component="img"
              height="140"
              image={video.thumbnail}
              alt={video.title}
              sx={{ filter: !isAuthenticated ? 'blur(3px)' : 'none', transition: 'filter 0.2s', borderRadius: 'var(--border-radius) var(--border-radius) 0 0' }}
            />
            {!isAuthenticated && (
              <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0,0,0,0.35)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2, borderRadius: 'var(--border-radius)' }}>
                <LockIcon sx={{ fontSize: 48, color: '#fff' }} />
                <Typography sx={{ color: '#fff', fontWeight: 700, mt: 1 }}>Connectez-vous pour débloquer</Typography>
              </Box>
            )}
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--text-color)', mb: 1 }} className="main-title">{video.title}</Typography>
              <Typography sx={{ fontSize: 14, color: 'var(--text-secondary)', mb: 1 }} className="main-text">{video.description}</Typography>
              <Typography sx={{ fontSize: 13, color: 'var(--accent-color)', fontStyle: 'italic' }}>Packs: {video.referencedPacks.map(p => p.name).join(', ') || '-'}</Typography>
              <Typography sx={{ fontSize: 12, color: '#888', mt: 1 }}>
                {video.referencedPacks.length > 0 ? (
                  video.referencedPacks.map((p, idx) => (
                    <span key={p.id}>
                      {p.name}: Durée: {getDetail(p.details, 'Durée') || '-'} | Type: {getDetail(p.details, 'Type') || '-'} | Niveau: {getDetail(p.details, 'Niveau') || '-'}
                      {idx < video.referencedPacks.length - 1 ? <br /> : null}
                    </span>
                  ))
                ) : 'Non référencé dans un pack'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" disabled={!isAuthenticated} sx={{ width: '100%', borderRadius: 'var(--border-radius)' }} className="button">
                {isAuthenticated ? 'Voir la vidéo' : 'Vidéos verrouillées'}
              </Button>
            </CardActions>
          </Card>
        )) : (
          <Typography sx={{ fontSize: 18, color: '#888', textAlign: 'center', mt: 5 }} className="main-text">Aucune vidéo trouvée.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default AllVideosPage;
