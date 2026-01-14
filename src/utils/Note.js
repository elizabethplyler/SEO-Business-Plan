import coursesData from '../data/courses.json';

/**
 * Generate a URL-friendly slug from a string
 * @param {string} str - The string to convert to a slug
 * @returns {string} - URL-friendly slug
 */
export function generateSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Get a course by its ID
 * @param {string} courseId - The course ID
 * @returns {object|null} - The course object or null if not found
 */
export function getCourseById(courseId) {
  return coursesData.find(course => course.id === courseId) || null;
}

/**
 * Get all courses
 * @returns {array} - Array of all courses
 */
export function getAllCourses() {
  return coursesData;
}

/**
 * Get course by title (fuzzy match)
 * @param {string} title - The course title to search for
 * @returns {object|null} - The course object or null if not found
 */
export function getCourseByTitle(title) {
  const normalizedTitle = title.toLowerCase().trim();
  return coursesData.find(course => 
    course.title.toLowerCase().includes(normalizedTitle) ||
    normalizedTitle.includes(course.title.toLowerCase())
  ) || null;
}

/**
 * Get social media posts for a specific course
 * @param {string} courseId - The course ID
 * @returns {object|null} - Social media posts object or null if course not found
 */
export function getCourseSocialMediaPosts(courseId) {
  const course = getCourseById(courseId);
  return course ? course.socialMediaPosts : null;
}

/**
 * Validate if a course ID exists
 * @param {string} courseId - The course ID to validate
 * @returns {boolean} - True if course exists, false otherwise
 */
export function isValidCourseId(courseId) {
  return coursesData.some(course => course.id === courseId);
}

/**
 * Check if a course has sub-courses
 * @param {string} courseId - The course ID to check
 * @returns {boolean} - True if course has subCourses array, false otherwise
 */
export function hasSubCourses(courseId) {
  const course = getCourseById(courseId);
  return course && Array.isArray(course.subCourses) && course.subCourses.length > 0;
}

/**
 * Get all sub-courses for a parent course
 * @param {string} courseId - The parent course ID
 * @returns {array} - Array of full course objects for sub-courses
 */
export function getSubCourses(courseId) {
  const course = getCourseById(courseId);
  if (!course || !Array.isArray(course.subCourses)) {
    return [];
  }
  
  return course.subCourses
    .map(subCourseId => getCourseById(subCourseId))
    .filter(subCourse => subCourse !== null);
}

/**
 * Check if a course should display as a category page
 * Uses sessionStorage to track if we're navigating from a category page
 * @param {string} courseId - The course ID to check
 * @returns {boolean} - True if course should show category page, false otherwise
 */
export function isCategoryPage(courseId) {
  const course = getCourseById(courseId);
  if (!course || !hasSubCourses(courseId)) {
    return false;
  }
  
  // Check if we're coming from a category page (stored in sessionStorage)
  const fromCategoryPage = sessionStorage.getItem(`fromCategory_${courseId}`);
  if (fromCategoryPage === 'true') {
    // Clear the flag and show detail page
    sessionStorage.removeItem(`fromCategory_${courseId}`);
    return false;
  }
  
  // Check if course is in its own subCourses array
  const isInOwnSubCourses = Array.isArray(course.subCourses) && course.subCourses.includes(courseId);
  const isSubCourseOfOther = isSubCourse(courseId);
  
  // If it's a sub-course of another course (not just self-referencing), show detail page
  if (isSubCourseOfOther && !isInOwnSubCourses) {
    return false;
  }
  
  // Otherwise, show category page
  return true;
}

/**
 * Check if a course is a sub-course of any parent course (excluding self-references)
 * @param {string} courseId - The course ID to check
 * @returns {boolean} - True if course is a sub-course of another course, false otherwise
 */
export function isSubCourse(courseId) {
  return coursesData.some(course => 
    course.id !== courseId && 
    Array.isArray(course.subCourses) && 
    course.subCourses.includes(courseId)
  );
}

/**
 * Get all main courses (excludes sub-courses that aren't also parent courses)
 * @returns {array} - Array of courses that should appear on the main page
 */
export function getMainCourses() {
  return coursesData.filter(course => {
    // Show course if it's not a sub-course, OR if it's both a sub-course AND a parent course
    return !isSubCourse(course.id) || hasSubCourses(course.id);
  });
}

export default {
  generateSlug,
  getCourseById,
  getAllCourses,
  getCourseByTitle,
  getCourseSocialMediaPosts,
  isValidCourseId,
  hasSubCourses,
  getSubCourses,
  isCategoryPage,
  isSubCourse,
  getMainCourses
};
