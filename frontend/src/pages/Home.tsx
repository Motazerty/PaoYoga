import React from 'react';
import PackCard from '../components/PackCard';
import { yogaPacks, makeupPacks } from '../data/packs';
import type { Pack } from '../data/packs';
import styled from 'styled-components';

type User = { email: string };


type HomeProps = {
  user: User;
  onLogout: () => void;
};

export default function Home({ user, onLogout }: HomeProps) {

 const handleBuy = (pack: Pack) => {
    alert(`Achat effectué : ${pack.name} pour ${pack.price}€`);
  };

  return (
    <PageContainer>
    <Header>
      <Welcome>Namaste, <Email>{user.email}</Email></Welcome>
      <LogoutButton onClick={onLogout}>Déconnexion</LogoutButton>
    </Header>

    <SectionTitle>Packs disponibles</SectionTitle>
    <PackRow>
      {[...yogaPacks, ...makeupPacks].map((pack) => (
        <PackCard key={pack.id} pack={pack} onBuy={handleBuy} />
      ))}
    </PackRow>
  </PageContainer>
  );
}

const PageContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const Welcome = styled.h1`
  font-weight: 700;
  font-size: 26px;
  color: #2c3e50;
`;

const Email = styled.span`
  color: #0048e4ff;
  font-style: italic;
`;

const LogoutButton = styled.button`
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 24px;
  padding: 10px 22px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(211, 47, 47, 0.3);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a72626;
  }
  &:focus {
    outline: 3px solid #a72626;
  }
`;

const SectionTitle = styled.h2`
  margin-bottom: 16px;
  font-size: 24px;
  color: #34495e;
  text-align: center;
`;

const PackRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
`;