// import React from 'react';
import { Box, Typography } from '@mui/material';
import { t } from '../utils/i18n';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#f7f7fa', py: 4, mt: 6 }}>
      <Box sx={{ maxWidth: 900, mx: 'auto', px: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#82b1ff', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22 }}>{t('P')}</Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>{t('PaoYoga')}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Typography sx={{ color: '#888' }}>{t('copyright')}</Typography>
          <Typography sx={{ color: '#888' }}>{t('contact')}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ mr: 1 }}>{t('followUs')}</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {/* Social icons can be kept as is, or wrapped in IconButton if desired */}
            <a href="https://facebook.com" aria-label="Facebook" style={{ display: 'flex', alignItems: 'center' }}>
              <svg width={24} height={24} fill="#1877f3" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.592 0 0 .592 0 1.326v21.348C0 23.407.592 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.733 0 1.325-.593 1.325-1.326V1.326C24 .592 23.408 0 22.675 0z"/></svg>
            </a>
            <a href="https://instagram.com" aria-label="Instagram" style={{ display: 'flex', alignItems: 'center' }}>
              <svg width={24} height={24} fill="#e4405f" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608-.058-1.266-.069-1.646-.069-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308 1.266-.058 1.646-.069 4.85-.069zm0 3.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm6.406-1.683a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            <a href="https://twitter.com" aria-label="Twitter" style={{ display: 'flex', alignItems: 'center' }}>
              <svg width={24} height={24} fill="#1da1f2" viewBox="0 0 24 24"><path d="M24 4.557a9.83 9.83 0 0 1-2.828.775A4.932 4.932 0 0 0 24 2.557a9.864 9.864 0 0 1-3.127 1.184 4.916 4.916 0 0 0-8.38 4.482A13.978 13.978 0 0 1 1.671 3.15a4.822 4.822 0 0 0-.666 2.475c0 1.708.87 3.216 2.188 4.099A4.904 4.904 0 0 1 .964 9.1v.062a4.936 4.936 0 0 0 3.95 4.827 4.996 4.996 0 0 1-2.224.084 4.936 4.936 0 0 0 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.945 13.945 0 0 0 7.548 2.212c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z"/></svg>
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}




