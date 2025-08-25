import React from 'react';
import { Box } from '@mui/material';
import { t } from '../utils/i18n';

const About: React.FC = () => (
  <Box sx={{ padding: '100px 20px', fontSize: 24, textAlign: 'center' }}>{t('aboutUs')}</Box>
);

export default About;
