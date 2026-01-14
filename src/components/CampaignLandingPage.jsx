import { useParams } from 'react-router-dom';
import Navigation from './Navigation';
import Breadcrumbs from './Breadcrumbs';
import CourseDetail from './CourseDetail';
import CategoryPage from './CategoryPage';
import { getCourseById, isCategoryPage } from '../utils/Note';

function CampaignLandingPage() {
  const { courseId } = useParams();
  const course = getCourseById(courseId);
  const showCategoryPage = isCategoryPage(courseId);

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
              <h1>International Mission Board</h1>
              <p>Training courses to equip you for the Great Pursuit</p>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content">
        {showCategoryPage ? (
          <CategoryPage course={course} />
        ) : (
          <CourseDetail course={course} />
        )}
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2024 International Mission Board, SBC</p>
          <p>Together we take the gospel to those who've never heard</p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
            <a 
              href="https://www.imb.org" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'rgba(255, 255, 255, 0.9)' }}
            >
              Visit IMB.org
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default CampaignLandingPage;
