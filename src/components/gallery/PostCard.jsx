import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiHeart2Fill, RiHeart2Line, RiChat3Line, RiEyeLine } from 'react-icons/ri';
import './PostCard.css';

export default function PostCard({ post, onLike }) {
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));
    if (onLike) onLike(post.id, newLiked);
  };

  return (
    <Link
      to={`/post/${post.id}`}
      className="post-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="post-card__image-wrapper">
        <img src={post.imageUrl} alt={post.title} className="post-card__image" loading="lazy" />
        <div className={`post-card__overlay ${isHovered ? 'post-card__overlay--visible' : ''}`}>
          <div className="post-card__overlay-content">
            <h3 className="post-card__title">{post.title}</h3>
            {post.category && <span className="post-card__category">{post.category}</span>}
            <div className="post-card__stats">
              <button className={`post-card__stat ${liked ? 'post-card__stat--liked' : ''}`} onClick={handleLike}>
                {liked ? <RiHeart2Fill /> : <RiHeart2Line />}
                <span>{likeCount}</span>
              </button>
              <span className="post-card__stat">
                <RiChat3Line />
                <span>{post.commentsCount || 0}</span>
              </span>
              <span className="post-card__stat">
                <RiEyeLine />
                <span>{post.views || 0}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
