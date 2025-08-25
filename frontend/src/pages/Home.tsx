import { useState, useEffect } from 'react';
import { Box, Card, Typography, Button, List, ListItem, Fade, Slide } from '@mui/material';

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: "url('/images/yoga-background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
        py: 8,
      }}
    >
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, bgcolor: 'rgba(255,255,255,0.2)' }} />
      <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 900, mx: 'auto', px: 2 }}>
        <Fade in={showContent} timeout={1200}>
          <Box>
            <Slide in={showContent} direction="up" timeout={900}>
              <Box textAlign="center" mb={6}>
                <Typography variant="h2" fontWeight={700} sx={{ color: 'var(--primary-color)', mb: 2 }}>
                  Bienvenue sur PaoYoga
                </Typography>
                <Typography variant="h5" fontWeight={400} sx={{ color: 'var(--accent-color)' }}>
                  Un espace de paix, d'équilibre et de reconnexion intérieure
                </Typography>
              </Box>
            </Slide>
            <Slide in={showContent} direction="up" timeout={1200}>
              <Card elevation={6} sx={{ borderRadius: 4, p: { xs: 3, md: 5 }, backdropFilter: 'blur(10px)', background: 'var(--surface-color)' }}>
                {/* ...existing code... */}
                <Box mb={4}>
                  <Typography variant="body1" sx={{ color: 'var(--text-color)', fontSize: 18, mb: 2 }}>
                    PaoYoga est un sanctuaire moderne où se rencontrent yoga, méditation, spiritualité et bienveillance. Nos pratiques vous accompagnent dans un voyage intérieur pour cultiver l'harmonie du corps et de l'âme.
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'var(--text-secondary)', fontSize: 18 }}>
                    Que vous débutiez ou approfondissiez votre pratique, nous vous offrons des outils pour ralentir, respirer et vivre pleinement l’instant présent.
                  </Typography>
                </Box>
                <Box mb={4}>
                  <Typography variant="h6" sx={{ color: 'var(--secondary-color)', mb: 2 }}>
                    🌸 Nos Offres
                  </Typography>
                  <List>
                    <ListItem sx={{ fontSize: 18, color: 'var(--secondary-color)', mb: 1 }}>• Cours de yoga doux, vinyasa & yin (en ligne et en présentiel)</ListItem>
                    <ListItem sx={{ fontSize: 18, color: 'var(--secondary-color)', mb: 1 }}>• Méditations guidées & pleine conscience</ListItem>
                    <ListItem sx={{ fontSize: 18, color: 'var(--secondary-color)', mb: 1 }}>• Cercles spirituels, retraites et rituels lunaires</ListItem>
                    <ListItem sx={{ fontSize: 18, color: 'var(--secondary-color)', mb: 1 }}>• Articles inspirants & formations énergétiques</ListItem>
                  </List>
                </Box>
                <Box mb={2}>
                  <Typography variant="h6" sx={{ color: 'var(--primary-color)', mb: 2 }}>
                    ✨ Rejoignez la communauté
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'var(--text-secondary)', fontSize: 18, mb: 2 }}>
                    Recevez nos inspirations hebdomadaires : conseils, événements, pratiques et offres exclusives.
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: 'var(--accent-color)',
                      color: 'var(--text-color)',
                      borderRadius: 30,
                      fontSize: 16,
                      py: 1.5,
                      px: 4,
                      mt: 1,
                      '&:hover': { backgroundColor: 'var(--primary-color)', color: 'var(--surface-color)' },
                    }}
                  >
                    S'inscrire à la newsletter
                  </Button>
                </Box>
              </Card>
            </Slide>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
}
