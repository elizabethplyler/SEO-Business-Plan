import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';
import { getSubCourses } from '../utils/Note';
import '../styles/course-detail.css';

function CategoryPage({ course }) {
  if (!course) {
    return (
      <div className="container section">
        <p>Course not found.</p>
      </div>
    );
  }

  const subCourses = getSubCourses(course.id);

  return (
    <div className="course-detail">
      {/* Hero Section with Course Image */}
      <section className="campaign-hero">
        <div className="campaign-hero-content">
          <div className="campaign-hero-image">
            <img 
              src={course.imageUrl} 
              alt={course.title} 
              className="campaign-hero-img"
            />
          </div>
          <div className="campaign-hero-text">
            <h1 className="campaign-title">{course.title}</h1>
            <p className="campaign-tagline">{course.description}</p>
          </div>
        </div>
      </section>

      {/* Why This Category Matters */}
      {course.about && (
        <section className="campaign-section campaign-why">
          <div className="container">
            <h2 className="campaign-section-title">Why This Matters</h2>
            <p className="campaign-lead-text">
              {course.about}
            </p>
          </div>
        </section>
      )}

      {/* Sub-Courses Grid */}
      <section className="campaign-section">
        <div className="container section">
          <h2 className="campaign-section-title">
            {course.id === 'short-term-trip-training' ? 'Training Resources' : 'Courses'}
          </h2>
          <p>
            {course.id === 'short-term-trip-training' 
              ? 'Choose the training resource that fits your role on the mission trip.'
              : 'Explore our training courses designed to help you understand and share the gospel with people from different religious backgrounds.'}
          </p>
          
          <div className="courses-grid">
            {subCourses.map((subCourse) => {
              // If this sub-course is in its own subCourses array, set a flag so it shows detail page
              const isSelfReferencing = Array.isArray(subCourse.subCourses) && subCourse.subCourses.includes(subCourse.id);
              
              return (
                <CourseCard
                  key={subCourse.id}
                  course={subCourse}
                  linkTo={`/course/${subCourse.id}`}
                  buttonText={course.id === 'short-term-trip-training' && subCourse.id === 'leaders-guide-short-term-trip-training' 
                    ? "View Leader's Guide" 
                    : subCourse.id === 'short-term-trip-training'
                    ? "Start Training"
                    : "Learn More"}
                  onNavigate={() => {
                    if (isSelfReferencing) {
                      sessionStorage.setItem(`fromCategory_${subCourse.id}`, 'true');
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Back to Courses */}
      <section className="campaign-section" style={{ backgroundColor: 'var(--imb-gray-light)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Link 
            to="/" 
            className="btn btn-secondary"
            style={{ fontSize: '1rem', padding: '0.875rem 2rem', marginRight: '1rem' }}
          >
            ← Back to All Courses
          </Link>
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
      </section>
    </div>
  );
}

export default CategoryPage;
