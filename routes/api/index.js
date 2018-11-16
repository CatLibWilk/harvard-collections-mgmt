const router = require('express').Router();
const apiController = require("../../controllers/apiController");

router.route('/')
        .post(apiController.getData);


module.exports = router;