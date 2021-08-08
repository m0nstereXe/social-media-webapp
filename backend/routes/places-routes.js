const express = require("express");
const router = express.Router();
const HttpError = require('../models/http-error');

const placesControllers = require('../controllers/places-controller.js');


//ORDER MATTERS NICK



router.post('/',placesControllers.createPlace);

router.get("/:pid", placesControllers.getPlaceById);

router.get("/users/:uid", placesControllers.getPlaceByUserId);

router.patch('/:pid',placesControllers.updatePlaceById);

router.delete('/:pid',placesControllers.deletePlaceById);

module.exports = router;
