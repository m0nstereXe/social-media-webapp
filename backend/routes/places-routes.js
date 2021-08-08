const express = require("express");
const router = express.Router();

const placesControllers = require('../controllers/places-controllers.js');


//ORDER MATTERS NICK



router.post('/',placesControllers.createPlace);

router.get("/:pid", placesControllers.getPlaceById);

router.get("/users/:uid", placesControllers.getPlacesByUserId);

router.patch('/:pid',placesControllers.updatePlaceById);

router.delete('/:pid',placesControllers.deletePlaceById);

module.exports = router;
