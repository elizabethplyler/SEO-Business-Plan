import { Link, useLocation } from 'react-router-dom';
import '../styles/navigation.css';

function Navigation() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <nav className="main-nav" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/" className="nav-logo">
            <img 
              src={`${import.meta.env.BASE_URL}assets/logos/Working__imb_icon_white_webready.png`}
              alt="IMB Logo" 
              className="nav-logo-img"
            />
          </Link>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--imb-white)' }}>IMB Training Courses</h1>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--imb-white)', opacity: 0.9 }}>Equipping believers to take the gospel to those who've never heard</p>
          </div>
        </div>
        <ul className="nav-links">
          <li>
            <Link 
              to="/" 
              className={isActive('/') && !location.pathname.startsWith('/social-media-posts') ? 'active' : ''}
            >
              Courses
            </Link>
          </li>
          <li>
            <Link 
              to="/social-media-posts" 
              className={isActive('/social-media-posts') ? 'active' : ''}
            >
              Social Media Posts
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
