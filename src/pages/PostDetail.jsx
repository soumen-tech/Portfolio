import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RiHeart2Fill, RiHeart2Line, RiArrowLeftLine, RiSendPlaneFill, RiCalendarLine, RiEyeLine, RiChat3Line } from 'react-icons/ri';
import { samplePosts } from '../data/sampleData';
import PostCard from '../components/gallery/PostCard';
import './PostDetail.css';

export default function PostDetail() {
  const { id } = useParams();
  const post = samplePosts.find((p) => p.id === id);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likes || 0);
  const [comments, setComments] = useState(post?.comments || []);
  const [newComment, setNewComment] = useState({ name: '', text: '' });

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return samplePosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);
  }, [post]);

  if (!post) {
    return (
      <div className="post-detail__not-found container">
        <h2>Post not found</h2>
        <Link to="/gallery" className="btn btn-primary">Back to Gallery</Link>
      </div>
    );
  }

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.name.trim() || !newComment.text.trim()) return;
    const comment = {
      id: `c${Date.now()}`,
      name: newComment.name,
      text: newComment.text,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setComments((prev) => [comment, ...prev]);
    setNewComment({ name: '', text: '' });
  };

  return (
    <div className="post-detail">
      <div className="container">
        <Link to="/gallery" className="post-detail__back btn-ghost">
          <RiArrowLeftLine /> Back to Gallery
        </Link>

        <div className="post-detail__layout">
          {/* Image */}
          <div className="post-detail__image-section">
            <div className="post-detail__image-wrapper glass-card" style={{ padding: '0.5rem' }}>
              <img src={post.imageUrl} alt={post.title} className="post-detail__image" />
            </div>
          </div>

          {/* Info */}
          <div className="post-detail__info-section">
            <span className="post-detail__category">{post.category}</span>
            <h1 className="heading-lg">{post.title}</h1>
            <p className="post-detail__description">{post.description}</p>

            <div className="post-detail__meta">
              <span className="post-detail__meta-item"><RiCalendarLine /> {post.createdAt}</span>
              <span className="post-detail__meta-item"><RiEyeLine /> {post.views} views</span>
              <span className="post-detail__meta-item"><RiChat3Line /> {comments.length} comments</span>
            </div>

            <div className="post-detail__actions">
              <button className={`btn ${liked ? 'btn-primary' : 'btn-outline'}`} onClick={handleLike}>
                {liked ? <RiHeart2Fill /> : <RiHeart2Line />}
                {liked ? 'Liked' : 'Like'} ({likeCount})
              </button>
            </div>

            {/* Comments Section */}
            <div className="post-detail__comments">
              <h3 className="heading-md">Comments ({comments.length})</h3>

              <form className="comment-form glass" onSubmit={handleSubmitComment}>
                <input
                  type="text"
                  placeholder="Your name"
                  value={newComment.name}
                  onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                  className="comment-form__input"
                  required
                />
                <div className="comment-form__text-row">
                  <textarea
                    placeholder="Write a comment..."
                    value={newComment.text}
                    onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                    className="comment-form__textarea"
                    rows={3}
                    required
                  />
                  <button type="submit" className="btn btn-primary comment-form__submit" aria-label="Send comment">
                    <RiSendPlaneFill />
                  </button>
                </div>
              </form>

              <div className="comments-list">
                {comments.length === 0 ? (
                  <p className="comments-list__empty">No comments yet. Be the first to share your thoughts!</p>
                ) : (
                  comments.map((c) => (
                    <div key={c.id} className="comment glass-card">
                      <div className="comment__avatar">{c.name.charAt(0).toUpperCase()}</div>
                      <div className="comment__body">
                        <div className="comment__header">
                          <span className="comment__name">{c.name}</span>
                          <span className="comment__date">{c.createdAt}</span>
                        </div>
                        <p className="comment__text">{c.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="post-detail__related section">
            <h2 className="heading-lg gradient-text" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              Related Works
            </h2>
            <div className="post-detail__related-grid">
              {relatedPosts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
