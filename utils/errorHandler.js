// This utility function maps Mongoose errors to standardized HTTP responses
// It helps to keep the error handling consistent across the application

const { STATUS_CODES, ERROR_MESSAGES } = require("./constants");

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

module.exports = { mapErrorToResponse };
