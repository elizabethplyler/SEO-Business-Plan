//Improvements - to the working code 
// Use remove emojis from output
// Split courseOutcomes into sentences in an array for easier semantic indexing.

function generateCourseJSONLD() {
  // -----------------------------
  // BASIC FIELDS
  // -----------------------------
  const title =
    document.querySelector("h1")?.textContent?.trim() ||
    document.title ||
    "International Mission Board Online Training Course";

  const purpose = "An online course to equip God's people for global mission.";

  const about =
    document.querySelector(".Text > div")?.textContent?.trim() ||
    "Learn the purpose and vision of IMB’s mission and how participants can engage in global disciple-making.";

      // -----------------------------
  // DESCRIPTION - Welcome paragraph
  // -----------------------------
  const welcomeP = Array.from(document.querySelectorAll(".Text p"))
    .find(p => p.textContent.trim().startsWith("Welcome to"));
  
  const description = welcomeP?.textContent?.trim() || "";


  // -----------------------------
  // HELPERS
  // -----------------------------
  const cleanText = (text) =>
  text
    .replace(/[\p{Emoji}]/gu, '')         // remove all emojis
    .replace(/[!?.]{2,}/g, '.')           // collapse repeated punctuation
    .trim();

    const splitSentences = (text) =>
  text.split(/(?<=[.?!])\s+/).filter(Boolean);


  const cleanHeading = (text, heading) => {
    const pattern = new RegExp(
      "^" + heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*(\\.*|:|\\.{3})?\\s*",
      "i"
    );
    return cleanText(text.replace(pattern, ""));
  };

  const getParagraphByStartsWith = (label) => {
    return Array.from(document.querySelectorAll(".Text p"))
      .map(p => p.textContent.trim())
      .find(t => t.toLowerCase().startsWith(label.toLowerCase()));
  };

  const getParagraphElementByStartsWith = (label) => {
    return Array.from(document.querySelectorAll(".Text p"))
      .find(p => p.textContent.trim().toLowerCase().startsWith(label.toLowerCase()));
  };

  // -----------------------------
  // AUDIENCE
  // -----------------------------
  const audienceP = getParagraphElementByStartsWith("Who it's for");
  const audience = audienceP
    ? cleanHeading(audienceP.textContent, "Who it's for ...")
    : "Believers, churches, leaders, and anyone wanting to understand God’s global mission and their role in it.";

  // -----------------------------
  // CONTENT (UL LIST)
  // -----------------------------
  const contentList = Array.from(document.querySelectorAll(".Text ul li"))
  .map(li => splitSentences(cleanText(li.textContent)))
  .flat() || [
      "Explore God’s mission from Scripture.",
      "Understand the role of the Church in global outreach.",
      "Discover practical ways to participate in international mission.",
      "Learn from experienced missionaries and global disciples."
    ];

  // -----------------------------
  // COURSE STRUCTURE
  // -----------------------------
  const structureP = getParagraphElementByStartsWith("How it works");
  const courseStructure = structureP
    ? cleanHeading(structureP.textContent, "How it works")
    : "Follow structured lessons that guide you through IMB’s mission and practical strategies.";

  // -----------------------------
  // COURSE OUTCOMES
  // -----------------------------
  const outcomesP = getParagraphElementByStartsWith("What you'll walk away with");
  let courseOutcomesText = outcomesP
    ? cleanHeading(outcomesP.textContent, "What you'll walk away with ...")
    : "Gain a solid foundation for engaging in God’s global mission, including biblical understanding, practical skills, and confidence to participate.";

  const courseOutcomes = splitSentences(courseOutcomesText);

  // -----------------------------
  // COURSE COVER IMAGE
  // -----------------------------
  const coverImgEl = document.querySelector(".ResourceHeader__Cover img");
  const image = coverImgEl
    ? new URL(coverImgEl.src, location.href).href
    : undefined;

  // -----------------------------
  // JSON-LD STRUCTURE
  // -----------------------------
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: title,
    learningResourceType: "IMB Online Online Course",
    courseMode: "Online",
    inLanguage: "English",  // Check the name for an language name and parse here
    purpose,
    keywords: [ title, "IMB", "International Missions Board", "online course", "global mission", "missionary training", "discipleship", "global discipleship", "cross-cultural ministry", "Bible", "scripture","scripture study"],
    about,
    description,
    audience,
    typicalAgeRange: "16+", //Ask team about this
    educationalLevel: "Beginner to Intermediate",  //Ask team about this
    educationalModule: contentList,
    courseStructure,
    teaches: courseOutcomes,
    url: location.href,
    ...(image && { image }),
    provider: {
      "@type": "Organization",
      name: "International Mission Board (IMB)",
      description: "Together we take the gospel to those who have never heard",
      url: "https://imb.org",
      logo: "https://www.imb.org/wp-content/uploads/2025/02/Logo.svg",
      email: "TrainingTeam@msnpath.com",
      telephone: "804.353.0151"
    }
  };

  // -----------------------------
  // INJECT INTO DOM
  // -----------------------------
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(jsonld, null, 2);

  document.querySelectorAll('script[type="application/ld+json"]').forEach(s => s.remove());
  document.head.appendChild(script);

  return jsonld;
}

generateCourseJSONLD();
