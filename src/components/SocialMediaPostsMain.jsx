import Navigation from './Navigation';
import Breadcrumbs from './Breadcrumbs';
import CourseCard from './CourseCard';
import { getAllCourses } from '../utils/Note';

function SocialMediaPostsMain() {
  const courses = getAllCourses();

  return (
    <>
      <Navigation />
      <Breadcrumbs />
      <header className="page-header">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img 
              src="/assets/logos/Working__imb_icon_white_webready.png" 
              alt="IMB Logo" 
              style={{ height: '50px', width: 'auto' }}
            />
            <div>
              <h1>Social Media Posts</h1>
              <p>View social media posts for each training course</p>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content">
        <div className="container section">
          <h2>Course Social Media Posts</h2>
          <p>Select a course to view its social media posts for Facebook, Instagram, and X (Twitter).</p>
          
          <div className="courses-grid">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                linkTo={`/social-media-posts/course/${course.id}`}
                buttonText="View Social Media Posts"
              />
            ))}
          </div>
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

export default SocialMediaPostsMain;
