// src/components/Navbar.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <Nav>
      <Logo to="/">PaoYoga</Logo>
      <Hamburger onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <FaBars />}
      </Hamburger>
      <NavLinks open={open}>
        {['/', '/yoga', '/massage', '/about'].map((path) => (
          <StyledNavLink key={path} to={path} onClick={() => setOpen(false)}>
            {path === '/' ? 'Accueil' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
          </StyledNavLink>
        ))}
      </NavLinks>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  position: sticky;
  top: 0;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  z-index: 100;
`;

const Logo = styled(NavLink)`
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
`;

const Hamburger = styled.div`
  display: none;
  font-size: 24px;
  cursor: pointer;
  margin-left: auto;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div<{ open: boolean }>`
  display: flex;
  margin-left: auto;
  gap: 24px;

  @media (max-width: 768px) {
    position: absolute;
    top: 64px;
    right: ${({ open }) => (open ? '0' : '-100%')};
    flex-direction: column;
    width: 200px;
    background: rgba(255, 255, 255, 0.95);
    transition: right 0.3s ease;
    padding: 16px;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: #34495e;
  text-decoration: none;
  font-size: 18px;
  position: relative;
  padding: 4px 0;

  &.active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 3px;
    background: #82b1ff;
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;
