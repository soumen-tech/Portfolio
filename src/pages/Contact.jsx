import { useState } from 'react';
import { RiSendPlaneFill, RiMailLine, RiMapPinLine, RiInstagramLine, RiPinterestLine, RiDribbbleLine, RiSparklingFill, RiCheckboxCircleFill } from 'react-icons/ri';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    setSending(true);
    // Simulate sending
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero__glow" />
        <div className="container">
          <span className="text-accent" style={{ fontSize: '1.2rem' }}>Let's Connect</span>
          <h1 className="heading-xl">Contact</h1>
          <p className="contact-hero__subtitle">
            Have a project in mind or just want to say hello? I'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section">
        <div className="container">
          <div className="contact__layout">
            {/* Info Column */}
            <div className="contact__info">
              <div className="contact__info-card glass-card">
                <div className="contact__info-icon">
                  <RiMailLine />
                </div>
                <h3>Email</h3>
                <p>hello@ariarose.art</p>
              </div>
              <div className="contact__info-card glass-card">
                <div className="contact__info-icon">
                  <RiMapPinLine />
                </div>
                <h3>Location</h3>
                <p>San Francisco, CA</p>
              </div>

              {/* Social Links */}
              <div className="contact__socials">
                <h3 className="heading-md" style={{ marginBottom: '1rem' }}>Follow Me</h3>
                <div className="contact__social-links">
                  <a href="#" className="contact__social-link glass-card" aria-label="Instagram">
                    <RiInstagramLine size={22} />
                    <span>Instagram</span>
                  </a>
                  <a href="#" className="contact__social-link glass-card" aria-label="Pinterest">
                    <RiPinterestLine size={22} />
                    <span>Pinterest</span>
                  </a>
                  <a href="#" className="contact__social-link glass-card" aria-label="Dribbble">
                    <RiDribbbleLine size={22} />
                    <span>Dribbble</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="contact__form-wrapper">
              {submitted ? (
                <div className="contact__success glass-card">
                  <div className="contact__success-icon">
                    <RiCheckboxCircleFill />
                  </div>
                  <h2 className="heading-md gradient-text">Message Sent!</h2>
                  <p>Thank you for reaching out. I'll get back to you as soon as possible!</p>
                  <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact__form glass-card" onSubmit={handleSubmit}>
                  <div className="contact__form-header">
                    <RiSparklingFill className="contact__form-sparkle" />
                    <h2 className="heading-md">Send a Message</h2>
                  </div>
                  <div className="contact__form-grid">
                    <div className="contact__field">
                      <label htmlFor="contact-name" className="contact__label">Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        className="contact__input"
                        required
                      />
                    </div>
                    <div className="contact__field">
                      <label htmlFor="contact-email" className="contact__label">Email *</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="contact__input"
                        required
                      />
                    </div>
                  </div>
                  <div className="contact__field">
                    <label htmlFor="contact-subject" className="contact__label">Subject</label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      className="contact__input"
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="contact-message" className="contact__label">Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="Tell me about your project or just say hello..."
                      value={formData.message}
                      onChange={handleChange}
                      className="contact__textarea"
                      rows={6}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary contact__submit" disabled={sending}>
                    {sending ? (
                      <>
                        <span className="contact__spinner" /> Sending...
                      </>
                    ) : (
                      <>
                        Send Message <RiSendPlaneFill />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
