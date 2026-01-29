import './Services.css';

const services = [
  {
    id: 1,
    title: 'Yoga',
    description: 'Reconnectez-vous à votre corps et à votre souffle à travers des pratiques adaptées à tous les niveaux.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C12 2 8 6 8 10C8 14 12 22 12 22C12 22 16 14 16 10C16 6 12 2 12 2Z"/>
        <circle cx="12" cy="10" r="2"/>
      </svg>
    ),
    features: [
      'Hatha Yoga - Postures fondamentales',
      'Vinyasa Flow - Dynamique et fluide',
      'Yin Yoga - Relaxation profonde',
      'Yoga Nidra - Méditation guidée',
      'Cours collectifs et individuels'
    ]
  },
  {
    id: 2,
    title: 'Massages',
    description: 'Libérez les tensions accumulées et retrouvez un état de détente profonde grâce à nos soins personnalisés.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 12C6 12 8 8 12 8C16 8 18 12 18 12"/>
        <path d="M6 12C6 12 8 16 12 16C16 16 18 12 18 12"/>
        <circle cx="12" cy="12" r="2"/>
        <path d="M12 4V8"/>
        <path d="M12 16V20"/>
      </svg>
    ),
    features: [
      'Massage relaxant - 60/90 min',
      'Massage aux pierres chaudes',
      'Massage ayurvédique Abhyanga',
      'Réflexologie plantaire',
      'Soins sur-mesure'
    ]
  },
  {
    id: 3,
    title: 'Bien-être',
    description: 'Découvrez nos ateliers et retraites pour approfondir votre pratique et cultiver la paix intérieure.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6V12L16 14"/>
        <path d="M12 2V4"/>
        <path d="M12 20V22"/>
        <path d="M2 12H4"/>
        <path d="M20 12H22"/>
      </svg>
    ),
    features: [
      'Ateliers respiration & pranayama',
      'Initiation à la méditation',
      'Retraites week-end',
      'Coaching bien-être',
      'Événements saisonniers'
    ]
  }
];

function Services() {
  return (
    <section id="services" className="services section">
      <div className="container">
        <div className="section-title">
          <span>Nos prestations</span>
          <h2>Services</h2>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article key={service.id} className="service-card">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <a href="#contact" className="btn btn-outline service-cta">
                En savoir plus
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
