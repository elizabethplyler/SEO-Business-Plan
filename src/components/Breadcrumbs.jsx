import { Link, useParams, useLocation } from 'react-router-dom';
import { getCourseById } from '../utils/Note';
import '../styles/breadcrumbs.css';

function Breadcrumbs() {
  const location = useLocation();
  const { courseId } = useParams();
  
  const getBreadcrumbs = () => {
    const path = location.pathname;
    const crumbs = [{ label: 'Home', path: '/' }];

    if (path.startsWith('/course/') && courseId) {
      const course = getCourseById(courseId);
      crumbs.push({ label: 'Courses', path: '/' });
      if (course) {
        crumbs.push({ label: course.title, path: path });
      }
    } else if (path.startsWith('/social-media-posts/course/') && courseId) {
      const course = getCourseById(courseId);
      crumbs.push({ label: 'Social Media Posts', path: '/social-media-posts' });
      if (course) {
        crumbs.push({ label: course.title, path: path });
      }
    } else if (path === '/social-media-posts') {
      crumbs.push({ label: 'Social Media Posts', path: path });
    } else if (path === '/') {
      crumbs[0].label = 'Courses';
    }

    return crumbs;
  };

  const crumbs = getBreadcrumbs();
  const lastIndex = crumbs.length - 1;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        {crumbs.map((crumb, index) => (
          <li key={crumb.path} className="breadcrumb-item">
            {index === lastIndex ? (
              <span className="breadcrumb-current" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <>
                <Link to={crumb.path} className="breadcrumb-link">
                  {crumb.label}
                </Link>
                <span className="breadcrumb-separator" aria-hidden="true">
                  {' > '}
                </span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
