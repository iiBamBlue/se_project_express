const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");

// Use the routers
router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

// Handle non-existent resources
router.use((req, res) => {
  res.status(404).json({ message: "Requested resource not found" });
});

module.exports = router;
