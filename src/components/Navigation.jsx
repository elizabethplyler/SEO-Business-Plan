import { Link, useLocation } from 'react-router-dom';
import '../styles/navigation.css';

function Navigation() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <nav className="main-nav" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img 
            src="/assets/logos/Working__imb_icon_white_webready.png" 
            alt="IMB Logo" 
            className="nav-logo-img"
          />
        </Link>
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
