// This module defines constants used across the application, including HTTP status codes
// It also provides a utility function to map errors to standardized HTTP responses.
// This helps maintain consistency in error handling across the application.

const { ERROR_MESSAGES } = require("./errors");

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

// This utility function maps Mongoose errors to standardized HTTP responses
// It helps to keep the error handling consistent across the application
function mapErrorToResponse(err) {
  if (err.name === "CastError") {
    return {
      statusCode: STATUS_CODES.BAD_REQUEST,
      message: ERROR_MESSAGES.INVALID_ID,
    };
  }
  if (err.name === "ValidationError") {
    return {
      statusCode: STATUS_CODES.BAD_REQUEST,
      message: ERROR_MESSAGES.INVALID_DATA,
    };
  }
  if (err.code === 11000) {
    return {
      statusCode: STATUS_CODES.CONFLICT,
      message: ERROR_MESSAGES.DUPLICATE_ENTRY,
    };
  }
  return {
    statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
    message: ERROR_MESSAGES.GENERIC_SERVER_ERROR,
  };
}

module.exports = {
  STATUS_CODES,
  ERROR_MESSAGES,
  mapErrorToResponse,
};
