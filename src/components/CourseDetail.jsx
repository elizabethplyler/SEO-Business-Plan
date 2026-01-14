import '../styles/course-detail.css';

function CourseDetail({ course }) {
  if (!course) {
    return (
      <div className="container section">
        <p>Course not found.</p>
      </div>
    );
  }

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
            {course.enrollmentCount && course.enrollmentCount !== "N/A" && (
              <div className="campaign-stats">
                <span className="stat-number">{course.enrollmentCount}</span>
                <span className="stat-label">believers already enrolled</span>
              </div>
            )}
            <div className="campaign-cta-primary">
              <a 
                href={course.pathwrightUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary btn-large"
              >
                Start Your Training Today
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Course Matters */}
      <section className="campaign-section campaign-why">
        <div className="container">
          <h2 className="campaign-section-title">Why This Matters</h2>
          <p className="campaign-lead-text">
            {course.about || course.description}
          </p>
        </div>
      </section>

      {/* Who It's For */}
      {course.whoItsFor && (
        <section className="campaign-section campaign-audience">
          <div className="container">
            <h2 className="campaign-section-title">This Course Is For You If...</h2>
            <p className="campaign-audience-text">{course.whoItsFor}</p>
          </div>
        </section>
      )}

      {/* What You'll Learn - Benefits Focused */}
      {course.whatYoullLearn && course.whatYoullLearn.length > 0 && (
        <section className="campaign-section campaign-benefits">
          <div className="container">
            <h2 className="campaign-section-title">What You'll Gain</h2>
            <div className="benefits-grid">
              {course.whatYoullLearn.map((point, index) => {
                // Extract emoji from the beginning of the point if present
                // Match common emoji ranges and specific emojis
                const emojiMatch = point.match(/^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/u);
                const emoji = emojiMatch ? emojiMatch[0] : '✓';
                // Remove emoji and any following space from the text
                const textWithoutEmoji = point.replace(/^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]\s*/u, '').trim();
                
                return (
                  <div key={index} className="benefit-card">
                    <div className="benefit-icon">{emoji}</div>
                    <p className="benefit-text">{textWithoutEmoji || point}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Final Call to Action */}
      <section className="campaign-section campaign-cta-final">
        <div className="container">
          <h2 className="campaign-cta-title">Ready to Make a Difference?</h2>
          <p className="campaign-cta-text">
            Join thousands of believers who are being equipped to take the gospel to those who've never heard. 
            Start your training today and be part of the Great Pursuit.
          </p>
          <div className="campaign-cta-buttons">
            <a 
              href={course.pathwrightUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary btn-large"
            >
              Begin Your Journey
            </a>
            {course.registerUrl && (
              <a 
                href={course.registerUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary btn-large"
              >
                Register Now
              </a>
            )}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a 
              href="https://imb.pathwright.com/library/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary btn-large"
            >
              View More Courses →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CourseDetail;
