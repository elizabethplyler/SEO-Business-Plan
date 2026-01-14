import { useParams } from 'react-router-dom';
import Navigation from './Navigation';
import Breadcrumbs from './Breadcrumbs';
import { getCourseById } from '../utils/Note';
import '../styles/social-media-posts.css';

function SocialMediaPosts() {
  const { courseId } = useParams();
  const course = getCourseById(courseId);

  if (!course) {
    return (
      <>
        <Navigation />
        <Breadcrumbs />
        <div className="container section">
          <p>Course not found.</p>
        </div>
      </>
    );
  }

  const { socialMediaPosts } = course;

  // Function to replace URLs with course name as a link
  const processPostContent = (content) => {
    if (!content || !course.pathwrightUrl) return content;
    
    // Regular expression to match URLs (with or without protocol, including imb.pathwright.com)
    const urlRegex = /(https?:\/\/[^\s]+|imb\.pathwright\.com[^\s]+|pathwright\.com[^\s]+)/g;
    
    return content.split('\n').map((line, lineIndex) => {
      if (!line.trim()) {
        return <p key={lineIndex}>&nbsp;</p>;
      }
      
      const parts = line.split(urlRegex);
      
      return (
        <p key={lineIndex}>
          {parts.map((part, partIndex) => {
            // Check if this part is a URL (with or without protocol)
            if (part.match(/^(https?:\/\/|imb\.pathwright\.com|pathwright\.com)/)) {
              return (
                <a 
                  key={partIndex}
                  href={course.pathwrightUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--imb-orange)', textDecoration: 'underline' }}
                >
                  {course.title}
                </a>
              );
            }
            return <span key={partIndex}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <>
      <Navigation />
      <Breadcrumbs />
      <header className="page-header">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img 
              src={`${import.meta.env.BASE_URL}assets/logos/Working__imb_icon_white_webready.png`}
              alt="IMB Logo" 
              style={{ height: '50px', width: 'auto' }}
            />
            <div>
              <h1>Social Media Posts</h1>
              <p>{course.title}</p>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content">
        <div className="social-posts-container">
          <div className="course-header">
            <h2>{course.title}</h2>
          </div>

          {socialMediaPosts?.facebook && socialMediaPosts.facebook.length > 0 && (
            <div className="platform-section">
              <div className="posts-grid posts-grid-centered">
                <div className="fb-post">
                  <div className="fb-post-header">
                    <img 
                      src="https://scontent-atl3-3.xx.fbcdn.net/v/t39.30808-6/287664536_392441916258795_2683536576253303198_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=6AjHat2glRIQ7kNvwFDYIAB&_nc_oc=AdkZtPPBXnctKtzaljtXRBCfp4x4GEr4etuKugUOEvhTxFs84FlyU8eZW5CreJIgsHc&_nc_zt=23&_nc_ht=scontent-atl3-3.xx&_nc_gid=cIn7V4IjSRPCOdX1UHwbHQ&oh=00_Afoa9OYZcTqw7zAJO4ZVK8Egqqn8hdMtsuF0qRAvPQqo2g&oe=696AA1E7" 
                      alt="IMB Social Media" 
                      className="fb-profile-pic"
                    />
                    <div className="fb-profile-info">
                      <div className="fb-username">International Mission Board</div>
                      <div className="fb-timestamp">2h</div>
                    </div>
                  </div>
                  {course.imageUrl && (
                    <img 
                      src={course.imageUrl} 
                      alt={course.title} 
                      className="fb-post-image"
                    />
                  )}
                  <div className="fb-post-content">
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.75rem' }}>{course.title}</p>
                    {processPostContent(socialMediaPosts.facebook[0].content)}
                  </div>
                  {socialMediaPosts.facebook[0].hashtags && (
                    <div className="fb-hashtags">{socialMediaPosts.facebook[0].hashtags}</div>
                  )}
                  
                  {/* Explore More Courses Section */}
                  <div className="explore-more-section">
                    <p>
                      Explore more courses: <a href="https://imb.pathwright.com/library/" target="_blank" rel="noopener noreferrer" className="explore-link">View All Courses →</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2024 International Mission Board, SBC</p>
          <p>Together we take the gospel to those who've never heard</p>
        </div>
      </footer>
    </>
  );
}

export default SocialMediaPosts;
