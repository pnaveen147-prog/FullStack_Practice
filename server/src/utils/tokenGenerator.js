const crypto = require("crypto");

/**
 * Generates a secure random token
 * Used for:
 * - Forgot Password
 * - Email Verification
 */

const generateRandomToken = (length = 32) => {
  return crypto.randomBytes(length).toString("hex");
};

module.exports = {
  generateRandomToken,
};
