// This module defines constants used across the application, including HTTP status codes
// It also provides a utility function to map errors to standardized HTTP responses.
// This helps maintain consistency in error handling across the application.

const { ERROR_MESSAGES } = require("./errors");
const { mapErrorToResponse } = require("./errorHandler");

// HTTP Status Codes
const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = {
  STATUS_CODES,
  ERROR_MESSAGES,
  mapErrorToResponse,
};
