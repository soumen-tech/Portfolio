import { Suspense, useRef } from 'react';
import { Link } from 'react-router-dom';
import { RiArrowRightLine, RiSparklingFill, RiPaletteLine, RiCameraLine, RiPaintBrushLine } from 'react-icons/ri';
import HeroScene from '../components/3d/HeroScene';
import PostCard from '../components/gallery/PostCard';
import { samplePosts, ownerInfo } from '../data/sampleData';
import { useScrollReveal } from '../hooks/useScrollAnimations';
import './Home.css';

export default function Home() {
  const featuredPosts = samplePosts.slice(0, 6);
  const pageRef = useRef(null);
  useScrollReveal(pageRef);

  return (
    <div className="home" ref={pageRef}>
      {/* ===== HERO ===== */}
      <section className="hero">
        <Suspense fallback={<div className="hero__fallback" />}>
          <HeroScene />
        </Suspense>
        <div className="hero__content container">
          <div className="hero__badge animate-fadeInUp">
            <RiSparklingFill /> Creative Portfolio
          </div>
          <h1 className="hero__title animate-fadeInUp" style={{ animationDelay: '0.15s' }}>
            <span className="text-accent" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', display: 'block', marginBottom: '0.5rem' }}>Hello, I'm</span>
            <span className="heading-xl">{ownerInfo.name}</span>
          </h1>
          <p className="hero__subtitle animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            {ownerInfo.tagline}
          </p>
          <div className="hero__actions animate-fadeInUp" style={{ animationDelay: '0.45s' }}>
            <Link to="/gallery" className="btn btn-primary">
              View My Work <RiArrowRightLine />
            </Link>
            <Link to="/about" className="btn btn-outline">
              About Me
            </Link>
          </div>
          <div className="hero__stats animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <div className="hero__stat">
              <span className="hero__stat-value">{ownerInfo.stats.posts}</span>
              <span className="hero__stat-label">Artworks</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">{ownerInfo.stats.followers}</span>
              <span className="hero__stat-label">Followers</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">{ownerInfo.stats.likes}</span>
              <span className="hero__stat-label">Total Likes</span>
            </div>
          </div>
        </div>
        <div className="hero__scroll-indicator">
          <div className="hero__scroll-line" />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section services">
        <div className="container">
          <div className="section__header" data-scroll="fade-up">
            <span className="text-accent" style={{ fontSize: '1.2rem' }}>What I Do</span>
            <h2 className="heading-lg gradient-text">Creative Services</h2>
          </div>
          <div className="services__grid" data-scroll="stagger">
            {[
              { icon: <RiPaletteLine />, title: 'Digital Art', desc: 'Vibrant digital illustrations and concept art that bring imagination to life' },
              { icon: <RiCameraLine />, title: 'Photography', desc: 'Capturing moments and perspectives through a creative artistic lens' },
              { icon: <RiPaintBrushLine />, title: 'Mixed Media', desc: 'Blending traditional and digital techniques for unique artistic expressions' },
            ].map((service, i) => (
              <div key={i} className="service-card glass-card tilt-3d">
                <div className="service-card__icon">{service.icon}</div>
                <h3 className="heading-md">{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED WORKS ===== */}
      <section className="section featured">
        <div className="container">
          <div className="section__header" data-scroll="fade-up">
            <span className="text-accent" style={{ fontSize: '1.2rem' }}>Recent Work</span>
            <h2 className="heading-lg gradient-text">Featured Artworks</h2>
            <p className="section__subtitle">A selection of my latest creative explorations</p>
          </div>
          <div className="featured__grid" data-scroll="stagger">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className="featured__cta" data-scroll="scale-in">
            <Link to="/gallery" className="btn btn-primary">
              View All Works <RiArrowRightLine />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section cta-section">
        <div className="cta-section__glow" />
        <div className="container cta-section__container" data-scroll="rotate-in">
          <span className="text-accent" style={{ fontSize: '1.3rem' }}>Let's Connect</span>
          <h2 className="heading-lg">Love what you see?</h2>
          <p>Feel free to explore my gallery or learn more about my creative process!</p>
          <Link to="/about" className="btn btn-primary">
            More About Me <RiArrowRightLine />
          </Link>
        </div>
      </section>
    </div>
  );
}
