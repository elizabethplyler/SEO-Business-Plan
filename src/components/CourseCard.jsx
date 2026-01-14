import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/course-card.css';

function CourseCard({ course, linkTo, buttonText, onNavigate }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const buttonRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [ripple, setRipple] = useState(null);

  // Handle card click
  const handleCardClick = (e) => {
    // Don't navigate if clicking on the button (let the button handle it)
    if (e.target.closest('.course-card-button')) {
      return;
    }
    if (onNavigate) {
      onNavigate();
    }
    navigate(linkTo);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    // Allow Enter or Space to activate the link
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(linkTo);
    }
  };

  // Handle button click with ripple effect
  const handleButtonClick = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRipple({ x, y });
    
    // Clear ripple after animation
    setTimeout(() => setRipple(null), 600);
  };

  // Generate unique IDs for ARIA
  const cardId = `course-card-${course.id}`;
  const imageId = `course-image-${course.id}`;
  const contentId = `course-content-${course.id}`;

  return (
    <article
      ref={cardRef}
      className="course-card"
      role="article"
      aria-label={`Course: ${course.title}`}
      aria-describedby={contentId}
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={{ cursor: 'pointer' }}
    >
      <figure className="course-card-figure">
        <div className="course-card-image-wrapper">
          <img
            id={imageId}
            src={course.imageUrl}
            alt={course.title}
            className="course-card-image"
            loading="lazy"
          />
          <div className="course-card-image-overlay" aria-hidden="true"></div>
        </div>
        <figcaption className="sr-only">{course.title} course image</figcaption>
      </figure>
      
      <div 
        id={contentId}
        className="course-card-content"
      >
        <h3 className="course-card-title">{course.title}</h3>
        <p className="course-card-description">{course.description}</p>
        <div className="course-card-button-wrapper">
          <Link
            ref={buttonRef}
            to={linkTo}
            className="btn btn-primary course-card-button"
            onClick={(e) => {
              if (onNavigate) {
                onNavigate();
              }
              handleButtonClick(e);
            }}
            aria-label={`${buttonText} for ${course.title}`}
          >
            {buttonText}
            {ripple && (
              <span
                className="ripple-effect"
                style={{
                  left: `${ripple.x}px`,
                  top: `${ripple.y}px`,
                }}
                aria-hidden="true"
              />
            )}
          </Link>
        </div>
      </div>
      
      {isFocused && (
        <div className="course-card-focus-indicator" aria-hidden="true"></div>
      )}
    </article>
  );
}

export default CourseCard;
