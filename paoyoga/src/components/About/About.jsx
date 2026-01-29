import './About.css';

const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
      </svg>
    ),
    title: 'Bienveillance',
    description: 'Accueil chaleureux'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 14S9.5 16 12 16C14.5 16 16 14 16 14"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
    title: 'Sérénité',
    description: 'Espace de paix'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/>
        <path d="M12 6V12L16 14"/>
      </svg>
    ),
    title: 'Authenticité',
    description: 'Approche sincère'
  }
];

function About() {
  return (
    <section id="a-propos" className="about section">
      <div className="container about-container">
        {/* Visual */}
        <div className="about-visual">
          <div className="about-decoration about-decoration-1"></div>
          <div className="about-image">
            <div className="about-image-placeholder">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 10C50 10 70 30 70 55C70 80 50 90 50 90C50 90 30 80 30 55C30 30 50 10 50 10Z" opacity="0.3"/>
                <circle cx="50" cy="55" r="8" opacity="0.5"/>
                <path d="M50 25V70" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
              </svg>
            </div>
          </div>
          <div className="about-decoration about-decoration-2"></div>
        </div>

        {/* Content */}
        <div className="about-content">
          <div className="section-title">
            <span>Notre histoire</span>
            <h2>À propos</h2>
          </div>

          <div className="about-text">
            <p>
              PaoYoga est né d'une passion profonde pour le bien-être et d'un 
              désir sincère de partager les bienfaits du yoga et des massages 
              avec le plus grand nombre. Notre approche allie tradition et 
              modernité pour vous offrir une expérience unique.
            </p>
            <p>
              Chaque séance est pensée comme un voyage intérieur, une parenthèse 
              de calme dans le tourbillon du quotidien. Nous croyons que chacun 
              mérite de prendre soin de soi, de retrouver son équilibre et de 
              cultiver sa paix intérieure.
            </p>
          </div>

          <div className="about-values">
            {values.map((value, index) => (
              <div key={index} className="about-value">
                <div className="about-value-icon">
                  {value.icon}
                </div>
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </div>
            ))}
          </div>

          <div className="about-quote">
            <blockquote>
              "Le yoga n'est pas de toucher ses orteils, c'est ce que vous 
              apprenez en chemin."
            </blockquote>
            <cite>— Jigar Gor</cite>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
