import DOMPurify from "isomorphic-dompurify";

export function sanitizeHtml(dirtyContent) {
  if (!dirtyContent) return "";
  return DOMPurify.sanitize(dirtyContent, {
    ALLOWED_TAGS: [
      "b",
      "i",
      "em",
      "strong",
      "a",
      "p",
      "br",
      "ul",
      "li",
      "h1",
      "h2",
      "h3",
    ],
    ALLOWED_ATTR: ["href", "target"],
  });
}
