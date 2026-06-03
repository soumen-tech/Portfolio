import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  RiLockLine, RiDashboardLine, RiImageAddLine, RiArticleLine,
  RiDeleteBinLine, RiEditLine, RiLogoutBoxLine, RiArrowLeftLine,
  RiEyeLine, RiHeart2Line, RiChat3Line, RiUploadCloudLine,
  RiCheckboxCircleFill, RiCloseLine, RiSparklingFill
} from 'react-icons/ri';
import { samplePosts, ownerInfo, categories } from '../data/sampleData';
import './Admin.css';

const ADMIN_PASSWORD = 'admin123'; // In production, use Firebase Auth

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [posts, setPosts] = useState(samplePosts);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '', description: '', category: 'Digital Art', imageUrl: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Try again.');
    }
  };

  const handleDeletePost = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.imageUrl.trim()) return;
    const post = {
      id: String(Date.now()),
      ...newPost,
      likes: 0,
      commentsCount: 0,
      views: 0,
      createdAt: new Date().toISOString().split('T')[0],
      comments: [],
    };
    setPosts([post, ...posts]);
    setNewPost({ title: '', description: '', category: 'Digital Art', imageUrl: '' });
    setShowUploadModal(false);
  };

  // Stats
  const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);
  const totalComments = posts.reduce((sum, p) => sum + (p.commentsCount || 0), 0);
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="admin-login__bg-glow" />
        <div className="admin-login__card glass-card">
          <div className="admin-login__icon">
            <RiLockLine />
          </div>
          <h1 className="heading-md gradient-text">Admin Access</h1>
          <p className="admin-login__desc">Enter your password to access the dashboard</p>
          <form onSubmit={handleLogin} className="admin-login__form">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-login__input"
              autoFocus
            />
            {authError && <span className="admin-login__error">{authError}</span>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <RiLockLine /> Enter Dashboard
            </button>
          </form>
          <Link to="/" className="admin-login__back">
            <RiArrowLeftLine /> Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      {/* Sidebar */}
      <aside className="admin__sidebar glass">
        <div className="admin__sidebar-header">
          <RiSparklingFill />
          <span className="text-accent" style={{ fontSize: '1.1rem' }}>Admin</span>
        </div>
        <nav className="admin__nav">
          <button
            className={`admin__nav-item ${activeTab === 'dashboard' ? 'admin__nav-item--active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <RiDashboardLine /> Dashboard
          </button>
          <button
            className={`admin__nav-item ${activeTab === 'posts' ? 'admin__nav-item--active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            <RiArticleLine /> Posts
          </button>
        </nav>
        <div className="admin__sidebar-footer">
          <Link to="/" className="admin__nav-item">
            <RiArrowLeftLine /> View Site
          </Link>
          <button className="admin__nav-item" onClick={() => setIsAuthenticated(false)}>
            <RiLogoutBoxLine /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin__main">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="admin__dashboard">
            <div className="admin__header">
              <div>
                <h1 className="heading-lg gradient-text">Dashboard</h1>
                <p className="admin__header-sub">Welcome back, {ownerInfo.name}</p>
              </div>
              <button className="btn btn-primary" onClick={() => { setActiveTab('posts'); setShowUploadModal(true); }}>
                <RiImageAddLine /> New Post
              </button>
            </div>

            {/* Stats Grid */}
            <div className="admin__stats">
              <div className="admin__stat-card glass-card">
                <div className="admin__stat-icon admin__stat-icon--posts"><RiArticleLine /></div>
                <div className="admin__stat-info">
                  <span className="admin__stat-value">{posts.length}</span>
                  <span className="admin__stat-label">Total Posts</span>
                </div>
              </div>
              <div className="admin__stat-card glass-card">
                <div className="admin__stat-icon admin__stat-icon--likes"><RiHeart2Line /></div>
                <div className="admin__stat-info">
                  <span className="admin__stat-value">{totalLikes.toLocaleString()}</span>
                  <span className="admin__stat-label">Total Likes</span>
                </div>
              </div>
              <div className="admin__stat-card glass-card">
                <div className="admin__stat-icon admin__stat-icon--comments"><RiChat3Line /></div>
                <div className="admin__stat-info">
                  <span className="admin__stat-value">{totalComments}</span>
                  <span className="admin__stat-label">Comments</span>
                </div>
              </div>
              <div className="admin__stat-card glass-card">
                <div className="admin__stat-icon admin__stat-icon--views"><RiEyeLine /></div>
                <div className="admin__stat-info">
                  <span className="admin__stat-value">{totalViews.toLocaleString()}</span>
                  <span className="admin__stat-label">Total Views</span>
                </div>
              </div>
            </div>

            {/* Recent Posts */}
            <div className="admin__recent">
              <h2 className="heading-md" style={{ marginBottom: '1.25rem' }}>Recent Posts</h2>
              <div className="admin__recent-grid">
                {posts.slice(0, 4).map((post) => (
                  <div key={post.id} className="admin__recent-card glass-card">
                    <img src={post.imageUrl} alt={post.title} className="admin__recent-img" />
                    <div className="admin__recent-info">
                      <h4>{post.title}</h4>
                      <div className="admin__recent-stats">
                        <span><RiHeart2Line /> {post.likes}</span>
                        <span><RiEyeLine /> {post.views}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="admin__posts">
            <div className="admin__header">
              <div>
                <h1 className="heading-lg gradient-text">Manage Posts</h1>
                <p className="admin__header-sub">{posts.length} posts in your portfolio</p>
              </div>
              <button className="btn btn-primary" onClick={() => setShowUploadModal(true)}>
                <RiImageAddLine /> Upload New
              </button>
            </div>

            <div className="admin__posts-list">
              {posts.map((post) => (
                <div key={post.id} className="admin__post-row glass-card">
                  <img src={post.imageUrl} alt={post.title} className="admin__post-thumb" />
                  <div className="admin__post-info">
                    <h4 className="admin__post-title">{post.title}</h4>
                    <span className="admin__post-category">{post.category}</span>
                    <span className="admin__post-date">{post.createdAt}</span>
                  </div>
                  <div className="admin__post-stats">
                    <span><RiHeart2Line /> {post.likes}</span>
                    <span><RiChat3Line /> {post.commentsCount || 0}</span>
                    <span><RiEyeLine /> {post.views}</span>
                  </div>
                  <div className="admin__post-actions">
                    <button className="btn-icon" title="Edit"><RiEditLine /></button>
                    <button className="btn-icon admin__post-delete" title="Delete" onClick={() => handleDeletePost(post.id)}>
                      <RiDeleteBinLine />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="admin__modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="admin__modal glass" onClick={(e) => e.stopPropagation()}>
            <div className="admin__modal-header">
              <h2 className="heading-md gradient-text">Upload New Post</h2>
              <button className="btn-icon" onClick={() => setShowUploadModal(false)}>
                <RiCloseLine size={20} />
              </button>
            </div>
            <form onSubmit={handleUpload} className="admin__upload-form">
              <div className="contact__field">
                <label className="contact__label">Title *</label>
                <input
                  type="text"
                  placeholder="Post title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="contact__input"
                  required
                />
              </div>
              <div className="contact__field">
                <label className="contact__label">Description</label>
                <textarea
                  placeholder="Describe your artwork..."
                  value={newPost.description}
                  onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                  className="contact__textarea"
                  rows={3}
                />
              </div>
              <div className="contact__field">
                <label className="contact__label">Category</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="contact__input admin__select"
                >
                  {categories.filter(c => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="contact__field">
                <label className="contact__label">Image URL *</label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={newPost.imageUrl}
                  onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })}
                  className="contact__input"
                  required
                />
              </div>
              {newPost.imageUrl && (
                <div className="admin__upload-preview">
                  <img src={newPost.imageUrl} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
                </div>
              )}
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <RiUploadCloudLine /> Publish Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
