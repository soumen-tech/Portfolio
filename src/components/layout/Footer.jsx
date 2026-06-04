import { Link } from 'react-router-dom';
import { RiSparklingFill, RiInstagramLine, RiPinterestLine, RiDribbbleLine, RiHeart2Fill } from 'react-icons/ri';
import { ownerInfo } from '../../data/sampleData';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__glow" />
      <div className="container footer__container">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <RiSparklingFill />
            <span className="text-accent" style={{ fontSize: '1.4rem' }}>Portfolio</span>
          </Link>
          <p className="footer__tagline">Creating beauty, one design at a time</p>
        </div>
        <div className="footer__links">
          <Link to="/" className="footer__link">Home</Link>
          <Link to="/gallery" className="footer__link">Gallery</Link>
          <Link to="/about" className="footer__link">About</Link>
        </div>
        <div className="footer__socials">
          <a href={ownerInfo.socials.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="Instagram"><RiInstagramLine size={18} /></a>
          <a href={ownerInfo.socials.pinterestUrl} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="Pinterest"><RiPinterestLine size={18} /></a>
          <a href={ownerInfo.socials.dribbbleUrl} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="Dribbble"><RiDribbbleLine size={18} /></a>
        </div>
        <div className="footer__bottom">
          <p>Made with <RiHeart2Fill className="footer__heart" /> &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
