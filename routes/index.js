const router = require("express").Router();
const path = require('path');
const apiRoutes = require('./api')


router.use("/api", apiRoutes);

//if no API calls hit, send react app
router.use(function(req, res) {
  console.log('no hit error')
  res.status(404);
});

module.exports = router;
