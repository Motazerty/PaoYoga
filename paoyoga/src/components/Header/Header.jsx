import { useState, useEffect } from 'react';
import './Header.css';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <a href="#accueil" className="logo">
          <svg className="logo-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lotusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B9A7D" />
                <stop offset="100%" stopColor="#6B7A5D" />
              </linearGradient>
            </defs>
            <ellipse cx="50" cy="55" rx="8" ry="25" fill="url(#lotusGradient)" transform="rotate(-30 50 55)" opacity="0.8"/>
            <ellipse cx="50" cy="55" rx="8" ry="25" fill="url(#lotusGradient)" transform="rotate(30 50 55)" opacity="0.8"/>
            <ellipse cx="50" cy="55" rx="8" ry="25" fill="url(#lotusGradient)" transform="rotate(-15 50 55)" opacity="0.9"/>
            <ellipse cx="50" cy="55" rx="8" ry="25" fill="url(#lotusGradient)" transform="rotate(15 50 55)" opacity="0.9"/>
            <ellipse cx="50" cy="55" rx="6" ry="22" fill="url(#lotusGradient)"/>
            <circle cx="50" cy="58" r="6" fill="#D4C4A8"/>
          </svg>
          <span className="logo-text">Pao<span>Yoga</span></span>
        </a>

        {/* Menu Toggle Mobile */}
        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation */}
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li><a href="#accueil" className="nav-link" onClick={closeMenu}>Accueil</a></li>
            <li><a href="#services" className="nav-link" onClick={closeMenu}>Services</a></li>
            <li><a href="#a-propos" className="nav-link" onClick={closeMenu}>À propos</a></li>
            <li><a href="#contact" className="nav-link" onClick={closeMenu}>Contact</a></li>
          </ul>
          <a href="#contact" className="btn btn-primary nav-cta" onClick={closeMenu}>
            Réserver
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
