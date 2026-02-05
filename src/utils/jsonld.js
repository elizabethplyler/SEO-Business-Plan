/**
 * JSON-LD utilities for SEO: inject script and build schema.org objects from app data.
 */

const ORGANIZATION = {
  "@type": "Organization",
  name: "International Mission Board (IMB)",
  description: "Together we take the gospel to those who have never heard",
  url: "https://imb.org",
  logo: "https://www.imb.org/wp-content/uploads/2025/02/Logo.svg",
  email: "TrainingTeam@msnpath.com",
  telephone: "804.353.0151",
};

function cleanText(text) {
  if (typeof text !== "string") return "";
  return text
    .replace(/[\p{Emoji}]/gu, "")
    .replace(/[!?.]{2,}/g, ".")
    .trim();
}

function splitSentences(text) {
  if (typeof text !== "string") return [];
  return text.split(/(?<=[.?!])\s+/).filter(Boolean);
}

/**
 * Remove existing JSON-LD scripts and append one script with the given payload.
 * @param {object | object[]} jsonld - One schema object or array of schema objects (valid JSON-LD graph)
 */
export function injectJsonLd(jsonld) {
  if (typeof document === "undefined" || !document.head) return;
  document.querySelectorAll('script[type="application/ld+json"]').forEach((s) => s.remove());
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(jsonld);
  document.head.appendChild(script);
}

/**
 * Build Organization schema (no @context; caller can wrap in array with other schemas).
 */
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    ...ORGANIZATION,
  };
}

/**
 * Build WebSite schema.
 * @param {string} baseUrl - Full site base URL (e.g. origin + BASE_URL)
 */
export function buildWebSiteSchema(baseUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "IMB Training Courses",
    url: baseUrl.replace(/\/$/, ""),
    publisher: { "@type": "Organization", ...ORGANIZATION },
  };
}

/**
 * Build ItemList schema for a list of courses (each item links to course page).
 * @param {object[]} courses - Array of course objects with id and title
 * @param {string} baseUrl - Full site base URL
 */
export function buildItemListSchema(courses, baseUrl) {
  const base = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "IMB Training Courses",
    description: "Online courses to equip God's people for global mission.",
    itemListElement: (courses || []).map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: base + "course/" + (course.id || ""),
      name: course.title || "",
    })),
  };
}

/**
 * Build WebPage schema.
 * @param {{ name: string, description: string, url: string }} options
 */
export function buildWebPageSchema({ name, description, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: name || "",
    description: description || "",
    url: url || "",
  };
}

/**
 * Build Course schema from a course object (from courses.json).
 * @param {object} course - Course object with title, description, about, whoItsFor, whatYoullLearn, imageUrl, pathwrightUrl, id
 * @param {{ baseUrl: string }} options - baseUrl for canonical course page URL
 */
export function buildCourseSchema(course, options = {}) {
  if (!course) return null;
  const baseUrl = options.baseUrl || (typeof window !== "undefined" ? window.location.origin + "/" : "");
  const base = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";

  const title = course.title || "International Mission Board Online Training Course";
  const description = course.description || "";
  const about = course.about || description;
  const audience = course.whoItsFor
    ? cleanText(course.whoItsFor)
    : "Believers, churches, leaders, and anyone wanting to understand God's global mission and their role in it.";

  const educationalModule = Array.isArray(course.whatYoullLearn)
    ? course.whatYoullLearn.map((item) => cleanText(String(item))).filter(Boolean)
    : [];

  const courseUrl = base + "course/" + (course.id || "");

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: title,
    learningResourceType: "Online Course",
    courseMode: "Online",
    inLanguage: "English",
    purpose: "An online course to equip God's people for global mission.",
    about,
    description,
    audience,
    typicalAgeRange: "16+",
    educationalLevel: "Beginner to Intermediate",
    ...(educationalModule.length > 0 && { educationalModule }),
    url: courseUrl,
    ...(course.imageUrl && { image: course.imageUrl }),
    provider: { "@type": "Organization", ...ORGANIZATION },
  };

  return jsonld;
}

/**
 * Get the site base URL (origin + Vite BASE_URL) for use in build functions.
 */
export function getBaseUrl() {
  if (typeof window === "undefined") return "";
  const origin = window.location.origin;
  const base = typeof import.meta !== "undefined" && import.meta.env && import.meta.env.BASE_URL
    ? import.meta.env.BASE_URL
    : "/";
  return origin + (base.startsWith("/") ? base : "/" + base);
}
