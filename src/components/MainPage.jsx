import Navigation from './Navigation';
import Breadcrumbs from './Breadcrumbs';
import CourseCard from './CourseCard';
import { getMainCourses } from '../utils/Note';

function MainPage() {
  const courses = getMainCourses();

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
              <h1>IMB Training Courses</h1>
              <p>Equipping believers to take the gospel to those who've never heard</p>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content">
        <div className="container section">
          <h2>Available Courses</h2>
          <p>Click on any course below to learn more and access training materials.</p>
          
          <div className="courses-grid">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                linkTo={`/course/${course.id}`}
                buttonText="Learn More"
              />
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a 
              href="https://imb.pathwright.com/library/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
              style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}
            >
              View More Courses →
            </a>
          </div>
        </div>
      </main>

      {/* Bottom Bar with View More Courses */}
      <div style={{
        backgroundColor: 'var(--imb-ocean-teal)',
        padding: '2rem 0',
        marginTop: '4rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <p style={{ 
            color: 'var(--imb-white)', 
            fontSize: '1.25rem', 
            marginBottom: '1rem',
            fontWeight: 500
          }}>
            Explore More Training Opportunities
          </p>
          <a 
            href="https://imb.pathwright.com/library/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
            style={{ 
              fontSize: '1.1rem', 
              padding: '1rem 2.5rem',
              backgroundColor: 'var(--imb-orange)',
              color: 'var(--imb-white)'
            }}
          >
            View More Courses →
          </a>
        </div>
      </div>

      <footer>
        <div className="container">
          <p>&copy; 2024 International Mission Board, SBC</p>
          <p>Together we take the gospel to those who've never heard</p>
        </div>
      </footer>
    </>
  );
}

export default MainPage;
