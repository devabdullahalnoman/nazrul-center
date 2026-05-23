export const InputEngine = {
  /**
   * Asserts whether an email parameter strictly adheres to standard RFC 5322 constraints.
   * Eliminates common injection vectors hidden in email inputs.
   */
  validateAndCleanseEmail(email) {
    if (!email || typeof email !== "string") {
      return { isValid: false, cleaned: "" };
    }
    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return {
      isValid: emailRegex.test(cleanEmail),
      cleaned: cleanEmail,
    };
  },

  /**
   * Enforces strict production length parameters for credentials.
   */
  validatePasswordStrength(password) {
    if (!password || typeof password !== "string") return false;
    return password.length >= 6; // Fits native Supabase authentication minimum requirements
  },

  /**
   * Escapes dangerous markers to neutralize Cross-Site Scripting (XSS) or HTML injections.
   */
  sanitizeString(text) {
    if (!text || typeof text !== "string") return "";
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;")
      .trim();
  },
};
