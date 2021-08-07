const express = require("express");
const router = express.Router();
const HttpError = require('../models/http-error');

const placesControllers = require('../controllers/places-controller.js');


//ORDER MATTERS NICK





router.get("/:pid", placesControllers.getPlaceById);

router.get("/users/:uid", placesControllers.getPlaceByUserId);

module.exports = router;
