import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',     // Remplacer par votre Service ID
        'YOUR_TEMPLATE_ID',    // Remplacer par votre Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message
        },
        'YOUR_PUBLIC_KEY'      // Remplacer par votre Public Key
      );

      alert('✅ Message envoyé avec succès !');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors de l\'envoi. Réessayez plus tard.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container contact-container">
        {/* Informations */}
        <div className="contact-info">
          <div className="section-title">
            <span>Nous contacter</span>
            <h2>Contact</h2>
          </div>

          <p className="contact-intro">
            Vous avez des questions ou souhaitez réserver une séance ? 
            N'hésitez pas à nous contacter. Nous serons ravis de vous 
            accompagner dans votre parcours bien-être.
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-item-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="contact-item-content">
                <h4>Adresse</h4>
                <p>123 Rue de la Sérénité<br/>75001 Paris</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="contact-item-content">
                <h4>Téléphone</h4>
                <a href="tel:+33123456789">+33 1 23 45 67 89</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="contact-item-content">
                <h4>Email</h4>
                <a href="mailto:contact@paoyoga.fr">contact@paoyoga.fr</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div className="contact-item-content">
                <h4>Horaires</h4>
                <p>Lun - Ven : 9h - 20h<br/>Sam : 10h - 18h</p>
              </div>
            </div>
          </div>

          <div className="contact-social">
            <a href="#" className="social-link" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Formulaire */}
        <div className="contact-form-wrapper">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Envoyez-nous un message</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nom complet *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="06 12 34 56 78"
                />
              </div>
              <div className="form-group">
                <label htmlFor="service">Service souhaité</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="">Sélectionnez un service</option>
                  <option value="yoga-hatha">Yoga Hatha</option>
                  <option value="yoga-vinyasa">Yoga Vinyasa</option>
                  <option value="yoga-yin">Yin Yoga</option>
                  <option value="massage-relaxant">Massage relaxant</option>
                  <option value="massage-pierres">Massage pierres chaudes</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Comment pouvons-nous vous aider ?"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary form-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Envoi...' : 'Envoyer le message'}
            </button>

            <p className="form-note">
              * Champs obligatoires. Nous vous répondons sous 24h.
            </p>
          </form>
        </div>
      </div>

      {/* Carte Google Maps */}
      <div className="container">
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.422894269774!2d-9.768281587886882!3d31.51254307410998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdad9b17d9fb682b%3A0xd8272d62de9bb29e!2sPao%20Yoga%20Essaouira!5e0!3m2!1sfr!2sfr!4v1756304764581!5m2!1sfr!2sfr"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation PaoYoga"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default Contact;
