const User = require("../models/user");
const {
  STATUS_CODES,
  ERROR_MESSAGES,
  mapErrorToResponse,
} = require("../utils/constants");

// GET /users - returns all users
function getUsers(req, res) {
  User.find({})
    .then((users) => res.status(STATUS_CODES.OK).json(users))
    .catch((err) => {
      const { statusCode, message } = mapErrorToResponse(err);
      return res.status(statusCode).json({ message });
    });
}

// GET /users/:userId - returns a user by _id
function getUser(req, res) {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
      error.statusCode = STATUS_CODES.NOT_FOUND;
      throw error;
    })
    .then((user) => res.status(STATUS_CODES.OK).json(user))
    .catch((err) => {
      // Check if it's a custom error with a status code
      if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      // Otherwise use the error mapping function
      const { statusCode, message } = mapErrorToResponse(err);
      return res.status(statusCode).json({ message });
    });
}

// POST /users - creates a new user
function createUser(req, res) {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(STATUS_CODES.CREATED).json(user))
    .catch((err) => {
      const { statusCode, message } = mapErrorToResponse(err);
      return res.status(statusCode).json({ message });
    });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
};
