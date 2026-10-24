// Explicit one-to-one mapping: project (projects.js) -> caseStudy (caseStudies.js)
// Matches each project to its case study by slug. Replaces any fuzzy title matching.
export const caseStudyForProject = {
  drift: "drift",
  gpt: "gpt",
  hayat: "hayat",
  ice: "ice",
  ims: "ims",
  learnlogix: "learnlogix",
  moody: "moody",
  nasa: "nasa",
};
