import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <svg className="footer-logo-icon" viewBox="0 0 100 100" fill="none">
                <defs>
                  <linearGradient id="footerLotus" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A8B89A" />
                    <stop offset="100%" stopColor="#8B9A7D" />
                  </linearGradient>
                </defs>
                <ellipse cx="50" cy="55" rx="8" ry="25" fill="url(#footerLotus)" transform="rotate(-30 50 55)" opacity="0.8"/>
                <ellipse cx="50" cy="55" rx="8" ry="25" fill="url(#footerLotus)" transform="rotate(30 50 55)" opacity="0.8"/>
                <ellipse cx="50" cy="55" rx="8" ry="25" fill="url(#footerLotus)" transform="rotate(-15 50 55)" opacity="0.9"/>
                <ellipse cx="50" cy="55" rx="8" ry="25" fill="url(#footerLotus)" transform="rotate(15 50 55)" opacity="0.9"/>
                <ellipse cx="50" cy="55" rx="6" ry="22" fill="url(#footerLotus)"/>
                <circle cx="50" cy="58" r="6" fill="#D4C4A8"/>
              </svg>
              <span className="footer-logo-text">Pao<span>Yoga</span></span>
            </div>
            <p className="footer-description">
              Offrez-vous un moment de sérénité. Découvrez nos séances de yoga 
              et massages pour harmoniser votre corps et apaiser votre esprit.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="footer-social-link" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#6B5340"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-column">
            <h4>Navigation</h4>
            <nav className="footer-links">
              <a href="#accueil">Accueil</a>
              <a href="#services">Services</a>
              <a href="#a-propos">À propos</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h4>Services</h4>
            <nav className="footer-links">
              <a href="#services">Yoga Hatha</a>
              <a href="#services">Yoga Vinyasa</a>
              <a href="#services">Yin Yoga</a>
              <a href="#services">Massages</a>
              <a href="#services">Ateliers</a>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="footer-column footer-newsletter">
            <h4>Newsletter</h4>
            <p>
              Inscrivez-vous pour recevoir nos conseils bien-être, 
              nos actualités et offres exclusives.
            </p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Votre email" 
                aria-label="Adresse email"
              />
              <button type="submit">OK</button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} <a href="#accueil">PaoYoga</a>. Tous droits réservés.
          </p>
          <div className="footer-legal">
            <a href="#">Mentions légales</a>
            <a href="#">Politique de confidentialité</a>
            <a href="#">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
