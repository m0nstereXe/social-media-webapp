const HttpError = require("../models/http-error");
const {validationResult} = require('express-validator');
const { v4: uuid } = require("uuid");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "big huge tower!!!!!",
    imageUrl: "https://images.emojiterra.com/twitter/v13.0/512px/1f9a7.png",
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
    imageUrl:
      "https://hips.hearstapps.com/edc.h-cdn.co/assets/16/45/1478626107-white-house-driveway.jpg",
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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided ID",
      404
    );
    throw error;
  }
  res.json({ place: place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });
  if (!places || places.length === 0) {
    const error = new HttpError(
      "Could not find places for the provided user ID",
      404
    );
    return next(error);
  }
  res.json({ places: places });
};

const createPlace = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty())
  {
    console.log(errors);
    throw new HttpError('Invalid inputs passed, please check your data',422);
  }
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ place: createdPlace }); //we created da thingy!!!!
};

const updatePlaceById = (req, res, next) => {
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
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({message: 'deleted place'});
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
exports.createPlace = createPlace;
exports.printLigma = printLigma;
