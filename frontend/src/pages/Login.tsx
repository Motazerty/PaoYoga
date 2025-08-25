
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../utils/api';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
  Alert,
  Link,
} from '@mui/material';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';

interface LoginProps {
  onLogin: (user: { email: string; isAdmin?: boolean }) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [registerMode, setRegisterMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    if (registerMode) {
      try {
        await createUser({ name: email, email, password });
        alert('Compte créé ! Connectez-vous.');
        setRegisterMode(false);
        setEmail('');
        setPassword('');
      } catch (err: any) {
        setError('Erreur lors de la création du compte');
      }
    } else {
      try {
        // const result = await login(email, password);
        // localStorage.setItem('token', result.token);
        // onLogin({ email: result.user.email });
  onLogin({ email: isAdmin ? "admin@site.com" : "tata@toto.com", isAdmin });
        navigate('/');


      } catch (err: any) {
        setError('Email ou mot de passe incorrect');
      }
    }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
  <Paper elevation={4} sx={{ p: 4, borderRadius: 3, maxWidth: 400, width: '100%', background: 'var(--surface-color)' }}>
        <Typography variant="h5" fontWeight={700} mb={3} sx={{ color: 'var(--primary-color)' }}>
          {registerMode ? 'Créer un compte' : 'Connexion'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <input type="checkbox" id="adminCheck" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
              <label htmlFor="adminCheck">Se connecter comme administrateur</label>
            </Box>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            fullWidth
            autoFocus
          />
          <TextField
            label="Mot de passe"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            fullWidth
          />
          <Box textAlign="right">
            <Link href="#" underline="hover" color="primary">
              Mot de passe oublié ?
            </Link>
          </Box>
          {error && <Alert severity="error">{error}</Alert>}
          <Button type="submit" variant="contained" sx={{ borderRadius: 3, py: 1.5, fontWeight: 700, background: 'var(--primary-color)', color: 'var(--surface-color)', '&:hover': { background: 'var(--accent-color)', color: 'var(--text-color)' } }}>
            {registerMode ? 'Créer le compte' : 'Se connecter'}
          </Button>
          <Box mt={1} textAlign="center">
            {registerMode ? (
              <Typography variant="body2">
                Déjà un compte ?{' '}
                <Link href="#" underline="hover" color="primary" onClick={() => setRegisterMode(false)}>
                  Se connecter
                </Link>
              </Typography>
            ) : (
              <Typography variant="body2">
                Pas de compte ?{' '}
                <Link href="#" underline="hover" color="primary" onClick={() => setRegisterMode(true)}>
                  Créer un compte
                </Link>
              </Typography>
            )}
          </Box>
        </Box>
        <Divider sx={{ my: 3 }}>ou</Divider>
        <Box display="flex" flexDirection="column" gap={1.5}>
          <Button
            variant="outlined"
            startIcon={<FaGoogle color="#ea4335" />}
            sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 600, bgcolor: 'var(--surface-color)', color: 'var(--primary-color)', borderColor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--background-color)' } }}
            onClick={() => alert('Connexion Google fictive')}
          >
            Google
          </Button>
          <Button
            variant="contained"
            startIcon={<FaFacebookF />}
            sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 600, bgcolor: 'var(--accent-color)', color: 'var(--text-color)', '&:hover': { bgcolor: 'var(--primary-color)', color: 'var(--surface-color)' } }}
            onClick={() => alert('Connexion Facebook fictive')}
          >
            Facebook
          </Button>
          <Button
            variant="contained"
            startIcon={<FaApple />}
            sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 600, bgcolor: 'var(--secondary-color)', color: 'var(--text-color)', '&:hover': { bgcolor: 'var(--primary-color)', color: 'var(--surface-color)' } }}
            onClick={() => alert('Connexion Apple fictive')}
          >
            Apple
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
