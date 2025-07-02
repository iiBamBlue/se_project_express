const ClothingItem = require("../models/clothingItem");
const { STATUS_CODES, ERROR_MESSAGES, mapErrorToResponse } = require("../utils/constants");

// GET /items - returns all clothing items
async function getClothingItems(req, res) {
  try {
    const items = await ClothingItem.find({});
    res.status(STATUS_CODES.OK).json(items);
  } catch (err) {
    const { statusCode, message } = mapErrorToResponse(err);
    res.status(statusCode).json({ message });
  }
}

// POST /items - creates a new item
function createClothingItem(req, res) {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(STATUS_CODES.CREATED).json(item))
    .catch((err) => {
      const { statusCode, message } = mapErrorToResponse(err);
      res.status(statusCode).json({ message });
    });
}

// DELETE /items/:itemId - deletes an item by _id
function deleteClothingItem(req, res) {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => {
      const error = new Error(ERROR_MESSAGES.ITEM_NOT_FOUND);
      error.statusCode = STATUS_CODES.NOT_FOUND;
      throw error;
    })
    .then(() => {
      res
        .status(STATUS_CODES.OK)
        .json({ message: ERROR_MESSAGES.ITEM_DELETED });
    })
    .catch((err) => {
      const { statusCode, message } = mapErrorToResponse(err);
      res.status(statusCode).json({ message });
    });
}

// PUT /items/:itemId/likes - like an item
function likeItem(req, res) {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error(ERROR_MESSAGES.ITEM_NOT_FOUND);
      error.statusCode = STATUS_CODES.NOT_FOUND;
      throw error;
    })
    .then((item) => res.status(STATUS_CODES.OK).json(item))
    .catch((err) => {
      const { statusCode, message } = mapErrorToResponse(err);
      res.status(statusCode).json({ message });
    });
}

// DELETE /items/:itemId/likes - unlike an item
function dislikeItem(req, res) {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error(ERROR_MESSAGES.ITEM_NOT_FOUND);
      error.statusCode = STATUS_CODES.NOT_FOUND;
      throw error;
    })
    .then((item) => res.status(STATUS_CODES.OK).json(item))
    .catch((err) => {
      const { statusCode, message } = mapErrorToResponse(err);
      res.status(statusCode).json({ message });
    });
}

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
};
