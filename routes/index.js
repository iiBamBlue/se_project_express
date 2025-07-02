const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const {
  STATUS_CODES,
  ERROR_MESSAGES,
  mapErrorToResponse,
} = require("../utils/constants");

// Use the routers
router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

// Handle non-existent resources
router.use((req, res) => {
  res
    .status(STATUS_CODES.NOT_FOUND)
    .json({ message: mapErrorToResponse(ERROR_MESSAGES.RESOURCE_NOT_FOUND) });
});

module.exports = router;
