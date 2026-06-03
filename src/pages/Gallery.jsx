import { useState, useMemo } from 'react';
import Masonry from 'react-masonry-css';
import PostCard from '../components/gallery/PostCard';
import { samplePosts, categories } from '../data/sampleData';
import { RiSearchLine, RiFilter3Line } from 'react-icons/ri';
import './Gallery.css';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    let filtered = samplePosts;
    if (activeCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [activeCategory, searchQuery]);

  const breakpointCols = { default: 4, 1200: 3, 768: 2, 500: 1 };

  return (
    <div className="gallery-page">
      <section className="gallery-hero">
        <div className="gallery-hero__glow" />
        <div className="container">
          <span className="text-accent" style={{ fontSize: '1.2rem' }}>My Collection</span>
          <h1 className="heading-xl">Gallery</h1>
          <p className="gallery-hero__subtitle">
            Browse through my creative journey — a curated collection of art, design, and imagination
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filters */}
          <div className="gallery__controls">
            <div className="gallery__search glass">
              <RiSearchLine className="gallery__search-icon" />
              <input
                type="text"
                placeholder="Search artworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="gallery__search-input"
              />
            </div>
            <div className="gallery__categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`gallery__category-btn ${activeCategory === cat ? 'gallery__category-btn--active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="gallery__count">
            Showing <span className="gradient-text">{filteredPosts.length}</span> artwork{filteredPosts.length !== 1 ? 's' : ''}
          </p>

          {/* Masonry Grid */}
          {filteredPosts.length > 0 ? (
            <Masonry
              breakpointCols={breakpointCols}
              className="masonry-grid"
              columnClassName="masonry-grid__column"
            >
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </Masonry>
          ) : (
            <div className="gallery__empty">
              <RiFilter3Line size={48} />
              <h3>No artworks found</h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
