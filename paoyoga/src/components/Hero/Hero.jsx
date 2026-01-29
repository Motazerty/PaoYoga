import './Hero.css';

function Hero() {
  return (
    <section id="accueil" className="hero">
      {/* Éléments flottants décoratifs */}
      <div className="floating-elements">
        <svg className="floating-leaf" width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M30 5C30 5 45 20 45 35C45 50 30 55 30 55C30 55 15 50 15 35C15 20 30 5 30 5Z" fill="#8B9A7D"/>
          <path d="M30 15V45" stroke="#6B7A5D" strokeWidth="1"/>
        </svg>
        <svg className="floating-leaf" width="50" height="50" viewBox="0 0 60 60" fill="none">
          <path d="M30 5C30 5 45 20 45 35C45 50 30 55 30 55C30 55 15 50 15 35C15 20 30 5 30 5Z" fill="#8B9A7D"/>
          <path d="M30 15V45" stroke="#6B7A5D" strokeWidth="1"/>
        </svg>
        <svg className="floating-leaf" width="40" height="40" viewBox="0 0 60 60" fill="none">
          <path d="M30 5C30 5 45 20 45 35C45 50 30 55 30 55C30 55 15 50 15 35C15 20 30 5 30 5Z" fill="#8B9A7D"/>
          <path d="M30 15V45" stroke="#6B7A5D" strokeWidth="1"/>
        </svg>
      </div>

      <div className="hero-container">
        <span className="hero-subtitle">Yoga & Massages</span>
        
        <h1 className="hero-title">
          Retrouvez votre <em>équilibre</em> intérieur
        </h1>
        
        <p className="hero-description">
          Offrez-vous un moment de sérénité. Découvrez nos séances de yoga 
          et massages pour harmoniser votre corps et apaiser votre esprit.
        </p>
        
        <div className="hero-cta">
          <a href="#services" className="btn btn-primary">
            Découvrir nos services
          </a>
          <a href="#contact" className="btn btn-outline">
            Prendre rendez-vous
          </a>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className="scroll-indicator">
        <span>Défiler</span>
        <div className="scroll-indicator-line"></div>
      </div>
    </section>
  );
}

export default Hero;
