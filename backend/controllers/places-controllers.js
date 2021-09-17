const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const { v4: uuid } = require("uuid");
const mongoose = require("mongoose");

const getCoordsForAddress = require("../util/location");
const Place = require("../models/place"); //importing a constructor for our mongoose place model
const User = require("../models/user");
const user = require("../models/user");


const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    //A static method using the Place Model Class to find stuff
    place = await Place.findById(placeId);
  } catch (error) {
    //catching error if the request to the server goes wrong
    return next(
      new HttpError("Something went wrong, could not find a place", 500)
    );
  }

  //catches error if the server doesn't send us back a place but the request was fine
  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided ID",
      404
    );
    return next(error);
  }
  //returns mongoose object to a converted object with its id normally defined
  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  // let places;
  let userWithPlaces
  try {
    userWithPlaces = await User.findById(userId).populate('places');
  } catch (error) {
    return next(
      new HttpError(
        "Something went wrong. Could not find places by userId",
        500
      )
    );
  }
  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    const error = new HttpError(
      "Could not find places for the provided user ID",
      404
    );
    return next(error);
  }
  // since places is an array we use .map
  // to call .object getters true on every item in the array and get a new array
  res.json({
    places: userWithPlaces.places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }
  const { title, description, address, creator } = req.body;
  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    console.log("We reach this error");
    return next(error); //if getCoordsFor address go next with error
  }

  //creates a new instance of the place model
  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates, 
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/200px-Tour_Eiffel_Wikimedia_Commons.jpg",
    creator,
  });

  let user;

  try {
    user = await User.findById(creator);
  } catch (error) {
    return next(
      new HttpError("Creating Place Failed, please try again :(", 500)
    );
  }

  if (!user) {
    console.log(user);
    return next(
      new HttpError("We could not find an user for the provided ID", 404)
    );
  }

  //saves our place model to the database
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdPlace.save({ session: session });
    user.places.push(createdPlace);
    await user.save({ session: session });
    await session.commitTransaction();
  } catch (error) {
    //in the case it doesnt work pass an error to the error handling middleware
    return next(new HttpError("Creating Place Failed.", 500));
  }

  res.status(201).json({ place: createdPlace }); //we created da thingy!!!!
};

const updatePlaceById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }
  const placeId = req.params.pid;
  const { title, description } = req.body;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not find a place", 500)
    );
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (error) {
    return next(
      new HttpError("Someting went wrong, could not update place", 500)
    );
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate('creator');
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not delete place", 500)
    );
  }

  if(!place)
  {
    return next(new HttpError('We could not find a place for this ID',404));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await place.remove({session: session});
    await place.creator.places.pull(place);
    await place.creator.save({session: session});
    await session.commitTransaction();
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not delete place", 500)
    );
  }

  res.status(200).json({ message: "deleted place" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
exports.createPlace = createPlace;
