// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface LoginProps {
  onLogin: (user: { email: string }) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email === 'user@example.com' && password === 'password') {
      onLogin({ email });
      navigate('/');
    } else {
      setError('Email ou mot de passe incorrect');
    }
  }

  return (
    <Container>
      <LoginBox>
        <Title>Connexion</Title>
        <Form onSubmit={handleSubmit}>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
          />
          <Label>Mot de passe</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Mot de passe"
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">Se connecter</Button>
        </Form>
      </LoginBox>
    </Container>
  );
}

const Container = styled.div`
  max-width: 380px;
  margin: 120px auto;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const LoginBox = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 24px;
  color: #34495e;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2c3e50;
  text-align: left;
`;

const Input = styled.input`
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #bbb;
  font-size: 16px;

  &:focus {
    border-color: #82b1ff;
    outline: none;
    box-shadow: 0 0 5px rgba(130,177,255,0.7);
  }
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  font-weight: 600;
`;

const Button = styled.button`
  padding: 14px 0;
  border-radius: 24px;
  background-color: #82b1ff;
  border: none;
  font-weight: 700;
  color: white;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(130,177,255,0.6);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4f8fff;
  }
  &:focus {
    outline: 3px solid #4f8fff;
  }
`;
