import { ownerInfo } from '../data/sampleData';
import { RiStarFill, RiSparklingFill, RiPaletteLine, RiCameraLine, RiPaintBrushLine, RiPencilLine, RiDropLine, RiLayoutLine } from 'react-icons/ri';
import './About.css';

const skillIcons = {
  'Digital Art': <RiPaletteLine />,
  'Illustration': <RiPencilLine />,
  'UI/UX Design': <RiLayoutLine />,
  'Photography': <RiCameraLine />,
  'Watercolor': <RiDropLine />,
  'Mixed Media': <RiPaintBrushLine />,
};

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero__glow" />
        <div className="about-hero__glow about-hero__glow--alt" />
        <div className="container">
          <span className="text-accent" style={{ fontSize: '1.2rem' }}>Get to Know Me</span>
          <h1 className="heading-xl">About Me</h1>
          <p className="about-hero__subtitle">
            The creative mind behind the art
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="section about-bio">
        <div className="container">
          <div className="about-bio__layout">
            <div className="about-bio__image-col">
              <div className="about-bio__image-frame glass-card">
                <div className="about-bio__image-placeholder">
                  <RiSparklingFill size={48} />
                  <span className="text-accent" style={{ fontSize: '1.5rem' }}>{ownerInfo.name}</span>
                </div>
                <div className="about-bio__image-badge glass">
                  <RiStarFill /> Creative Designer
                </div>
              </div>
              {/* Floating decoration */}
              <div className="about-bio__float-orb about-bio__float-orb--1" />
              <div className="about-bio__float-orb about-bio__float-orb--2" />
            </div>

            <div className="about-bio__content-col">
              <span className="text-accent" style={{ fontSize: '1.1rem' }}>My Story</span>
              <h2 className="heading-lg gradient-text">Passion Meets Pixels</h2>
              <p className="about-bio__text">{ownerInfo.bio}</p>
              <p className="about-bio__text">
                Every project is a new adventure — I love experimenting with colors, shapes, and textures 
                to create pieces that evoke emotion and spark imagination. Whether it's a delicate watercolor 
                wash or a bold digital composition, I pour my heart into every creation.
              </p>

              {/* Stats */}
              <div className="about-bio__stats">
                <div className="about-bio__stat glass-card">
                  <span className="about-bio__stat-value gradient-text">{ownerInfo.stats.posts}</span>
                  <span className="about-bio__stat-label">Artworks</span>
                </div>
                <div className="about-bio__stat glass-card">
                  <span className="about-bio__stat-value gradient-text">{ownerInfo.stats.followers}</span>
                  <span className="about-bio__stat-label">Followers</span>
                </div>
                <div className="about-bio__stat glass-card">
                  <span className="about-bio__stat-value gradient-text">{ownerInfo.stats.likes}</span>
                  <span className="about-bio__stat-label">Total Likes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section about-skills">
        <div className="about-skills__bg-glow" />
        <div className="container">
          <div className="section__header">
            <span className="text-accent" style={{ fontSize: '1.2rem' }}>Expertise</span>
            <h2 className="heading-lg gradient-text">Skills & Mediums</h2>
            <p className="section__subtitle">Tools and techniques I use to bring visions to life</p>
          </div>
          <div className="about-skills__grid">
            {ownerInfo.skills.map((skill, i) => (
              <div key={skill} className="skill-card glass-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="skill-card__icon">
                  {skillIcons[skill] || <RiSparklingFill />}
                </div>
                <span className="skill-card__name">{skill}</span>
                <div className="skill-card__bar">
                  <div
                    className="skill-card__bar-fill"
                    style={{ width: `${75 + Math.random() * 20}%`, animationDelay: `${i * 0.15 + 0.3}s` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section about-philosophy">
        <div className="container">
          <div className="about-philosophy__card glass-card">
            <div className="about-philosophy__quote-mark">"</div>
            <blockquote className="about-philosophy__quote">
              Art is not what you see, but what you make others see. I believe in creating work
              that doesn't just look beautiful — it feels beautiful.
            </blockquote>
            <div className="about-philosophy__author">
              <div className="about-philosophy__author-avatar">
                <RiSparklingFill />
              </div>
              <div>
                <span className="about-philosophy__author-name">{ownerInfo.name}</span>
                <span className="about-philosophy__author-title">{ownerInfo.tagline}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
