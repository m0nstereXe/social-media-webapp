const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const placesControllers = require("../controllers/places-controllers.js");

//ORDER MATTERS NICK

router.get('/:pid', placesControllers.getPlaceById);

router.get('/users/:uid', placesControllers.getPlacesByUserId);

router.post(
  '/',
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5, max: 256 }),
    check('address').not().isEmpty(),
  ],
  placesControllers.createPlace
);

router.patch('/:pid', placesControllers.updatePlaceById);

router.delete('/:pid', placesControllers.deletePlaceById);

module.exports = router;
