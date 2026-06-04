import { useState, useRef, useCallback } from 'react';
import { ownerInfo } from '../data/sampleData';
import {
  RiStarFill, RiSparklingFill, RiPaletteLine, RiCameraLine,
  RiPaintBrushLine, RiPencilLine, RiDropLine, RiLayoutLine,
  RiInstagramLine, RiPinterestLine, RiDribbbleLine, RiGlobalLine,
  RiMailLine, RiMapPinLine, RiBriefcaseLine, RiGraduationCapLine,
  RiAwardLine, RiToolsLine, RiTranslate2, RiCheckboxCircleFill,
  RiUpload2Line, RiImageAddLine, RiCloseLine, RiExternalLinkLine,
  RiUser3Line
} from 'react-icons/ri';
import { SiBehance } from 'react-icons/si';
import { useScrollReveal } from '../hooks/useScrollAnimations';
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
  const [profileImage, setProfileImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const pageRef = useRef(null);

  useScrollReveal(pageRef);

  // Drag and Drop handlers
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          setProfileImage(ev.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }, []);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfileImage(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const removeImage = useCallback(() => {
    setProfileImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  return (
    <div className="about-page" ref={pageRef}>
      {/* ====== HERO ====== */}
      <section className="about-hero">
        <div className="about-hero__glow" />
        <div className="about-hero__glow about-hero__glow--alt" />
        <div className="about-hero__particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="about-hero__particle" style={{
              '--delay': `${Math.random() * 5}s`,
              '--x': `${Math.random() * 100}%`,
              '--size': `${3 + Math.random() * 6}px`,
              '--duration': `${3 + Math.random() * 4}s`,
            }} />
          ))}
        </div>
        <div className="container">
          <span className="text-accent" style={{ fontSize: '1.2rem' }}>Get to Know Me</span>
          <h1 className="heading-xl">About Me</h1>
          <p className="about-hero__subtitle">
            The creative mind behind the art
          </p>
        </div>
      </section>

      {/* ====== BIO SECTION with Profile Upload ====== */}
      <section className="section about-bio">
        <div className="container">
          <div className="about-bio__layout">
            {/* Profile Image Column with Drag & Drop */}
            <div className="about-bio__image-col" data-scroll="fade-left">
              <div
                className={`about-bio__image-frame glass-card ${isDragging ? 'about-bio__image-frame--dragging' : ''}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {profileImage ? (
                  <div className="about-bio__image-uploaded">
                    <img src={profileImage} alt="Profile" className="about-bio__profile-img" />
                    <button className="about-bio__remove-btn" onClick={removeImage} aria-label="Remove image">
                      <RiCloseLine />
                    </button>
                  </div>
                ) : (
                  <div className="about-bio__drop-zone">
                    <div className="about-bio__drop-icon-wrapper">
                      <div className="about-bio__drop-icon-ring" />
                      <RiImageAddLine className="about-bio__drop-icon" />
                    </div>
                    <span className="about-bio__drop-title">Drop Your Photo Here</span>
                    <span className="about-bio__drop-subtitle">or</span>
                    <button
                      className="btn btn-outline about-bio__browse-btn"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <RiUpload2Line /> Browse Files
                    </button>
                    <span className="about-bio__drop-hint">PNG, JPG, WEBP up to 10MB</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="about-bio__file-input"
                    />
                  </div>
                )}
                <div className="about-bio__image-badge glass">
                  {ownerInfo.availableForWork ? (
                    <><RiCheckboxCircleFill className="about-bio__available-dot" /> Available for Work</>
                  ) : (
                    <><RiStarFill /> Creative Designer</>
                  )}
                </div>
              </div>
              {/* Floating 3D orbs */}
              <div className="about-bio__float-orb about-bio__float-orb--1" />
              <div className="about-bio__float-orb about-bio__float-orb--2" />
              <div className="about-bio__float-orb about-bio__float-orb--3" />
            </div>

            {/* Content Column */}
            <div className="about-bio__content-col" data-scroll="fade-right">
              <span className="text-accent" style={{ fontSize: '1.1rem' }}>My Story</span>
              <h2 className="heading-lg gradient-text">Passion Meets Pixels</h2>
              <p className="about-bio__text">{ownerInfo.bio}</p>
              <p className="about-bio__text">
                Every project is a new adventure — I love experimenting with colors, shapes, and textures
                to create pieces that evoke emotion and spark imagination. Whether it's a delicate watercolor
                wash or a bold digital composition, I pour my heart into every creation.
              </p>

              {/* Quick Info Tags */}
              <div className="about-bio__quick-info">
                <div className="about-bio__info-tag glass">
                  <RiBriefcaseLine /> {ownerInfo.profession}
                </div>
                <div className="about-bio__info-tag glass">
                  <RiMapPinLine /> {ownerInfo.location}
                </div>
                <div className="about-bio__info-tag glass">
                  <RiMailLine /> {ownerInfo.email}
                </div>
                <div className="about-bio__info-tag glass">
                  <RiGlobalLine /> {ownerInfo.website}
                </div>
              </div>

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

      {/* ====== SOCIAL MEDIA SECTION ====== */}
      <section className="section about-socials">
        <div className="about-socials__bg-glow" />
        <div className="container">
          <div className="section__header" data-scroll="fade-up">
            <span className="text-accent" style={{ fontSize: '1.2rem' }}>Connect With Me</span>
            <h2 className="heading-lg gradient-text">Social Profiles</h2>
            <p className="section__subtitle">Follow my creative journey across platforms</p>
          </div>
          <div className="about-socials__grid" data-scroll="stagger">
            <a href={ownerInfo.socials.instagramUrl} target="_blank" rel="noopener noreferrer" className="social-card glass-card">
              <div className="social-card__icon social-card__icon--instagram">
                <RiInstagramLine />
              </div>
              <div className="social-card__info">
                <h3>Instagram</h3>
                <span className="social-card__handle">{ownerInfo.socials.instagram}</span>
              </div>
              <RiExternalLinkLine className="social-card__arrow" />
            </a>
            <a href={ownerInfo.socials.pinterestUrl} target="_blank" rel="noopener noreferrer" className="social-card glass-card">
              <div className="social-card__icon social-card__icon--pinterest">
                <RiPinterestLine />
              </div>
              <div className="social-card__info">
                <h3>Pinterest</h3>
                <span className="social-card__handle">{ownerInfo.socials.pinterest}</span>
              </div>
              <RiExternalLinkLine className="social-card__arrow" />
            </a>
            <a href={ownerInfo.socials.dribbbleUrl} target="_blank" rel="noopener noreferrer" className="social-card glass-card">
              <div className="social-card__icon social-card__icon--dribbble">
                <RiDribbbleLine />
              </div>
              <div className="social-card__info">
                <h3>Dribbble</h3>
                <span className="social-card__handle">{ownerInfo.socials.dribbble}</span>
              </div>
              <RiExternalLinkLine className="social-card__arrow" />
            </a>
            <a href={ownerInfo.socials.behanceUrl} target="_blank" rel="noopener noreferrer" className="social-card glass-card">
              <div className="social-card__icon social-card__icon--behance">
                <SiBehance />
              </div>
              <div className="social-card__info">
                <h3>Behance</h3>
                <span className="social-card__handle">{ownerInfo.socials.behance}</span>
              </div>
              <RiExternalLinkLine className="social-card__arrow" />
            </a>
          </div>
        </div>
      </section>

      {/* ====== WORK EXPERIENCE ====== */}
      <section className="section about-experience">
        <div className="container">
          <div className="section__header" data-scroll="fade-up">
            <span className="text-accent" style={{ fontSize: '1.2rem' }}>Career Journey</span>
            <h2 className="heading-lg gradient-text">Work Experience</h2>
          </div>
          <div className="about-experience__timeline">
            {ownerInfo.experience.map((exp, i) => (
              <div key={i} className="timeline-card glass-card" data-scroll="rotate-in">
                <div className="timeline-card__dot" />
                <div className="timeline-card__period">{exp.period}</div>
                <h3 className="timeline-card__role">{exp.role}</h3>
                <span className="timeline-card__company">
                  <RiBriefcaseLine /> {exp.company}
                </span>
                <p className="timeline-card__desc">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SKILLS ====== */}
      <section className="section about-skills">
        <div className="about-skills__bg-glow" />
        <div className="container">
          <div className="section__header" data-scroll="fade-up">
            <span className="text-accent" style={{ fontSize: '1.2rem' }}>Expertise</span>
            <h2 className="heading-lg gradient-text">Skills & Mediums</h2>
            <p className="section__subtitle">Tools and techniques I use to bring visions to life</p>
          </div>
          <div className="about-skills__grid" data-scroll="stagger">
            {ownerInfo.skills.map((skill, i) => (
              <div key={skill} className="skill-card glass-card">
                <div className="skill-card__icon">
                  {skillIcons[skill] || <RiSparklingFill />}
                </div>
                <span className="skill-card__name">{skill}</span>
                <div className="skill-card__bar">
                  <div
                    className="skill-card__bar-fill"
                    style={{ width: `${75 + Math.random() * 20}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== TOOLS & SOFTWARE ====== */}
      <section className="section about-tools">
        <div className="container">
          <div className="section__header" data-scroll="fade-up">
            <span className="text-accent" style={{ fontSize: '1.2rem' }}>My Toolkit</span>
            <h2 className="heading-lg gradient-text">Tools & Software</h2>
          </div>
          <div className="about-tools__grid" data-scroll="stagger">
            {ownerInfo.tools.map((tool, i) => (
              <div key={tool} className="tool-chip glass">
                <RiToolsLine /> {tool}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== EDUCATION ====== */}
      <section className="section about-education">
        <div className="about-education__bg-glow" />
        <div className="container">
          <div className="about-education__layout">
            {/* Education */}
            <div className="about-education__col" data-scroll="fade-left">
              <div className="about-education__header">
                <RiGraduationCapLine className="about-education__icon" />
                <h2 className="heading-lg gradient-text">Education</h2>
              </div>
              {ownerInfo.education.map((edu, i) => (
                <div key={i} className="education-card glass-card">
                  <span className="education-card__year">{edu.year}</span>
                  <h3 className="education-card__degree">{edu.degree}</h3>
                  <p className="education-card__school">{edu.school}</p>
                </div>
              ))}
            </div>

            {/* Awards */}
            <div className="about-education__col" data-scroll="fade-right">
              <div className="about-education__header">
                <RiAwardLine className="about-education__icon" />
                <h2 className="heading-lg gradient-text">Awards</h2>
              </div>
              {ownerInfo.awards.map((award, i) => (
                <div key={i} className="education-card glass-card">
                  <span className="education-card__year">{award.year}</span>
                  <h3 className="education-card__degree">{award.title}</h3>
                  <div className="education-card__trophy">
                    <RiAwardLine />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== LANGUAGES ====== */}
      <section className="section about-languages">
        <div className="container">
          <div className="section__header" data-scroll="fade-up">
            <span className="text-accent" style={{ fontSize: '1.2rem' }}>Communication</span>
            <h2 className="heading-lg gradient-text">Languages</h2>
          </div>
          <div className="about-languages__grid" data-scroll="stagger">
            {ownerInfo.languages.map((lang, i) => (
              <div key={lang} className="language-card glass-card">
                <RiTranslate2 className="language-card__icon" />
                <span>{lang}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== PHILOSOPHY / QUOTE ====== */}
      <section className="section about-philosophy">
        <div className="container">
          <div className="about-philosophy__card glass-card" data-scroll="scale-in">
            <div className="about-philosophy__quote-mark">"</div>
            <blockquote className="about-philosophy__quote">
              Art is not what you see, but what you make others see. I believe in creating work
              that doesn't just look beautiful — it feels beautiful.
            </blockquote>
            <div className="about-philosophy__author">
              <div className="about-philosophy__author-avatar">
                {profileImage ? (
                  <img src={profileImage} alt={ownerInfo.name} className="about-philosophy__author-img" />
                ) : (
                  <RiUser3Line />
                )}
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
