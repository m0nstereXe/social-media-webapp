const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const { v4: uuid } = require("uuid");

const getCoordsForAddress = require("../util/location");
const Place = require("../models/place"); //importing a constructor for our mongoose place model

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "big huge tower!!!!!",
    address: "376 Lakeview Drive, Wyckoff NJ",
    location: {
      lat: 40.9894912,
      lng: -74.1605376,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Poop",
    description: "look at this cool stuff!",
    address: "1600 Pensylvania Ave, Washington DC",
    location: {
      lat: 38.8977,
      lng: -77.0365,
    },
    creator: "u2",
  },
];

const printLigma = () => {
  console.log("LIGMA");
};

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

  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (error) {
    return next(
      new HttpError(
        "Something went wrong. Could not find places by userId",
        500
      )
    );
  }

  if (!places || places.length === 0) {
    const error = new HttpError(
      "Could not find places for the provided user ID",
      404
    );
    return next(error);
  }
  console.log(places);
  // since places is an array we use .map 
  // to call .object getters true on every item in the array and get a new array
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      HttpError("Invalid inputs passed, please check your data", 422)
    );
  }
  const { title, description, address, creator } = req.body;
  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
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

  //saves our place model to the database
  try {
    await createdPlace.save();
  } catch (error) {
    //in the case it doesnt work pass an error to the error handling middleware
    return next(new HttpError("Creating Place Failed.", 500));
  }

  res.status(201).json({ place: createdPlace }); //we created da thingy!!!!
};

const updatePlaceById = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }
  const placeId = req.params.pid;
  const { title, description } = req.body;
  const updatedPlace = {
    ...DUMMY_PLACES.find((p) => {
      return p.id === placeId;
    }),
  };
  console.log(placeId);
  console.log(
    DUMMY_PLACES.find((p) => {
      return p.id === placeId;
    })
  );
  if (!updatedPlace) {
    const error = new HttpError(
      "Could not find a place for the provided ID",
      404
    );
    throw error;
  }
  const placeIndex = DUMMY_PLACES.findIndex((p) => {
    return p.id === placeId;
  });
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;
  res.status(200).json({ place: updatedPlace });
};

const deletePlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("Could not find a place with that ID", 404);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "deleted place" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
exports.createPlace = createPlace;
exports.printLigma = printLigma;
