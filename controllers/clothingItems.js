const ClothingItem = require("../models/clothingItem");
const { STATUS_CODES, ERROR_MESSAGES } = require("../utils/constants");

// GET /items - returns all clothing items
const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(STATUS_CODES.OK).json(items))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

// POST /items - creates a new item
const createClothingItem = (req, res) => {
  console.log(req.user._id); // _id will become accessible

  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id; // Take the user ID from the middleware

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(STATUS_CODES.CREATED).json(item))
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

// DELETE /items/:itemId - deletes an item by _id
const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => {
      const error = new Error(ERROR_MESSAGES.ITEM_NOT_FOUND);
      error.statusCode = STATUS_CODES.NOT_FOUND;
      throw error;
    })
    .then(() =>
      res.status(STATUS_CODES.OK).json({ message: ERROR_MESSAGES.ITEM_DELETED })
    )
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      if (err.name === "CastError") {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ message: ERROR_MESSAGES.INVALID_ITEM_ID });
      }
      if (err.statusCode === STATUS_CODES.NOT_FOUND) {
        return res
          .status(STATUS_CODES.NOT_FOUND)
          .json({ message: ERROR_MESSAGES.ITEM_NOT_FOUND });
      }
      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

// PUT /items/:itemId/likes - like an item
const likeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail(() => {
      const error = new Error(ERROR_MESSAGES.ITEM_NOT_FOUND);
      error.statusCode = STATUS_CODES.NOT_FOUND;
      throw error;
    })
    .then((item) => res.status(STATUS_CODES.OK).json(item))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      if (err.name === "CastError") {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ message: ERROR_MESSAGES.INVALID_ITEM_ID });
      }
      if (err.statusCode === STATUS_CODES.NOT_FOUND) {
        return res
          .status(STATUS_CODES.NOT_FOUND)
          .json({ message: ERROR_MESSAGES.ITEM_NOT_FOUND });
      }
      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

// DELETE /items/:itemId/likes - unlike an item
const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail(() => {
      const error = new Error(ERROR_MESSAGES.ITEM_NOT_FOUND);
      error.statusCode = STATUS_CODES.NOT_FOUND;
      throw error;
    })
    .then((item) => res.status(STATUS_CODES.OK).json(item))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      if (err.name === "CastError") {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ message: ERROR_MESSAGES.INVALID_ITEM_ID });
      }
      if (err.statusCode === STATUS_CODES.NOT_FOUND) {
        return res
          .status(STATUS_CODES.NOT_FOUND)
          .json({ message: ERROR_MESSAGES.ITEM_NOT_FOUND });
      }
      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
};
