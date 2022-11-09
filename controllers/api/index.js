const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./commentRoutes");

//creates routers with similar endpoints to use the ones below
router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
