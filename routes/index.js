const router = require("express").Router();
const path = require('path');
const apiRoutes = require('./api')


router.use("/api", apiRoutes);

//if no API calls hit, send react app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
