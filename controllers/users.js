const User = require("../models/user");
const { STATUS_CODES, ERROR_MESSAGES } = require("../utils/constants");

// GET /users - returns all users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(STATUS_CODES.OK).json(users))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

// GET /users/:userId - returns a user by _id
const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
      error.statusCode = STATUS_CODES.NOT_FOUND;
      throw error;
    })
    .then((user) => res.status(STATUS_CODES.OK).json(user))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      if (err.name === "CastError") {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ message: ERROR_MESSAGES.INVALID_USER_ID });
      }
      if (err.statusCode === STATUS_CODES.NOT_FOUND) {
        return res
          .status(STATUS_CODES.NOT_FOUND)
          .json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

// POST /users - creates a new user
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(STATUS_CODES.CREATED).json(user))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      if (err.name === "ValidationError") {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          message: ERROR_MESSAGES.VALIDATION_ERROR,
        });
      }
      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
