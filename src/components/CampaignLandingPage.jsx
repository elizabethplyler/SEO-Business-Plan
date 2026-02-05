import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from './Navigation';
import Breadcrumbs from './Breadcrumbs';
import CourseDetail from './CourseDetail';
import CategoryPage from './CategoryPage';
import { getCourseById, isCategoryPage, getSubCourses } from '../utils/Note';
import { injectJsonLd, getBaseUrl, buildCourseSchema, buildItemListSchema } from '../utils/jsonld';

function CampaignLandingPage() {
  const { courseId } = useParams();
  const course = getCourseById(courseId);
  const showCategoryPage = isCategoryPage(courseId);

  useEffect(() => {
    const c = getCourseById(courseId);
    if (!c) return;
    const baseUrl = getBaseUrl();
    const schemas = [buildCourseSchema(c, { baseUrl })];
    if (isCategoryPage(courseId)) {
      schemas.push(buildItemListSchema(getSubCourses(courseId), baseUrl));
    }
    injectJsonLd(schemas);
  }, [courseId]);

  return (
    <>
      <Navigation />
      <Breadcrumbs />

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
