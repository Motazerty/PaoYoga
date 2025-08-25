// src/components/Navbar.tsx
import React, { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, IconButton, Select, MenuItem, Avatar, Menu, MenuItem as MuiMenuItem, Tooltip, Switch } from '@mui/material';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../pages/CartPage';
import { t, setLanguage } from '../utils/i18n';



import { User } from '../data/packs';


type UserType = (User & { isAdmin?: boolean }) | null;

interface NavbarProps {
  user: UserType;
  onLogin: () => void;
  onLogout: () => void;
}

const logoUrl = '/main-icon.svg'; // Use your logo path here
const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isUserMenuOpen = Boolean(anchorEl);

  // Theme switcher (simple body class)
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : '';
  }, [theme]);

  function handleLangChange(e: any) {
    const value = e.target.value as 'fr' | 'en';
    setLang(value);
    setLanguage(value);
  }
  function handleThemeChange(e: any) {
    setTheme(e.target.checked ? 'dark' : 'light');
  }
  function handleUserMenu(e: React.MouseEvent<HTMLElement>) {
    setAnchorEl(e.currentTarget);
  }
  function handleUserMenuClose() {
    setAnchorEl(null);
  }

  return (
    <Box sx={{ position: 'sticky', top: 0, px: 3, height: 64, display: 'flex', alignItems: 'center', bgcolor: 'rgba(255,255,255,0.92)', boxShadow: 2, backdropFilter: 'blur(10px)', zIndex: 100 }}>
      {/* Logo and site name */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <img src={logoUrl} alt="Logo" style={{ width: 36, height: 36, marginRight: 8 }} />
        <Typography component={NavLink} to="/" sx={{ fontSize: 24, fontWeight: 'bold', color: '#2c3e50', textDecoration: 'none', letterSpacing: 1 }}>PaoYoga</Typography>
      </Box>
      {/* Mobile menu button */}
      <IconButton aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} sx={{ display: { xs: 'block', md: 'none' }, fontSize: 24, ml: 'auto' }} onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <FaBars />}
      </IconButton>
      {/* Main nav links and actions */}
      <Box
        sx={{
          display: { xs: open ? 'flex' : 'none', md: 'flex' },
          position: { xs: 'absolute', md: 'static' },
          top: { xs: 64, md: 'auto' },
          right: { xs: open ? 0 : '-100%', md: 'auto' },
          flexDirection: { xs: 'column', md: 'row' },
          width: { xs: 220, md: 'auto' },
          bgcolor: { xs: 'rgba(255,255,255,0.98)', md: 'transparent' },
          boxShadow: { xs: 3, md: 'none' },
          transition: { xs: 'right 0.3s ease', md: 'none' },
          p: { xs: 2, md: 0 },
          ml: 'auto',
          gap: 3,
          alignItems: 'center',
        }}
        role="navigation"
        aria-label="Menu principal"
      >
        {/* Main links */}
        {["/", "/yoga", "/massage", "/spiritualObjects", "/allVideos", "/about"].map((path) => (
          <Typography
            key={path}
            component={NavLink}
            to={path}
            onClick={() => setOpen(false)}
            sx={{ color: '#34495e', textDecoration: 'none', fontSize: 18, position: 'relative', px: 1, py: 0.5, '&.active': { fontWeight: 700, borderBottom: '3px solid #82b1ff' }, '&:hover': { borderBottom: '3px solid #82b1ff' } }}
            tabIndex={0}
            aria-label={path === '/' ? t('welcome') : t(path.slice(1))}
          >
            {path === "/" ? t('welcome') : t(path.slice(1))}
          </Typography>
        ))}
        {/* Admin Panel link for admin users */}
        {user?.isAdmin && (
          <Typography
            component={NavLink}
            to="/admin"
            onClick={() => setOpen(false)}
            sx={{ color: '#c62828', textDecoration: 'none', fontSize: 18, position: 'relative', px: 1, py: 0.5, fontWeight: 700, '&.active': { borderBottom: '3px solid #c62828' }, '&:hover': { borderBottom: '3px solid #c62828' } }}
            tabIndex={0}
            aria-label="Admin Panel"
          >
            Admin Panel
          </Typography>
        )}
        {/* User links */}
        {user && (
          <>
            {/* <Typography component={NavLink} to="/my-videos" onClick={() => setOpen(false)} sx={{ color: '#34495e', textDecoration: 'none', fontSize: 18, position: 'relative', px: 1, py: 0.5, '&.active': { fontWeight: 700, borderBottom: '3px solid #82b1ff' }, '&:hover': { borderBottom: '3px solid #82b1ff' } } } tabIndex={0} aria-label={t('videos')}>{t('videos')}</Typography> */}
          </>
        )}
        {/* Cart icon with badge */}
        <Tooltip title={cart.length > 0 ? `${cart.length} article(s)` : 'Panier vide'}>
          <Box component={NavLink} to="/cart" aria-label="Mon Panier" onClick={() => setOpen(false)} sx={{ display: 'flex', alignItems: 'center', color: '#34495e', textDecoration: 'none', fontSize: 18, position: 'relative', mr: 1 }}>
            <FaShoppingCart style={{ marginRight: 6 }} />
            {cart.length > 0 && (
              <Box sx={{ bgcolor: '#82b1ff', color: 'white', borderRadius: '50%', px: 1, fontSize: 14, fontWeight: 700, ml: 0.5 }}>{cart.length}</Box>
            )}
          </Box>
        </Tooltip>
        {/* Language selector */}
        <Select value={lang} onChange={handleLangChange} aria-label="Choisir la langue" sx={{ ml: 1, px: 1, borderRadius: 1, bgcolor: '#f7faff', fontSize: 15, color: '#0048e4', fontWeight: 600 }}>
          <MenuItem value="fr">FR</MenuItem>
          <MenuItem value="en">EN</MenuItem>
        </Select>
        {/* Theme switcher */}
        <Tooltip title={theme === 'dark' ? 'Mode sombre' : 'Mode clair'}>
          <Switch checked={theme === 'dark'} onChange={handleThemeChange} color="primary" inputProps={{ 'aria-label': 'Changer le thème' }} />
        </Tooltip>
        {/* User menu or login button */}
        {user ? (
          <>
            <Tooltip title={user.email}>
              <IconButton onClick={handleUserMenu} sx={{ p: 0 }} aria-label="Menu utilisateur">
                <Avatar alt={user.email} src={user.email ? `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}` : undefined} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={isUserMenuOpen}
              onClose={handleUserMenuClose}
              onClick={handleUserMenuClose}
              PaperProps={{
                elevation: 3,
                sx: { mt: 1.5, minWidth: 160 },
              }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MuiMenuItem onClick={() => { navigate('/profile'); handleUserMenuClose(); }}>{t('profile')}</MuiMenuItem>
              <MuiMenuItem onClick={() => { onLogout(); handleUserMenuClose(); }}>Déconnexion</MuiMenuItem>
            </Menu>
          </>
        ) : (
          <Button variant="contained" onClick={() => navigate('/login')} sx={{ bgcolor: '#82b1ff', color: 'white', borderRadius: 3, px: 2, fontWeight: 600, boxShadow: 1, '&:hover': { bgcolor: '#4f8fff' }, '&:focus': { outline: '3px solid #4f8fff' } }}>Connexion</Button>
        )}
      </Box>
    </Box>
  );
};
export default Navbar;
