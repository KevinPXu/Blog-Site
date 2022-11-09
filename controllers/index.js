const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");

//sets router endpoints for the root routes and the api routes
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
