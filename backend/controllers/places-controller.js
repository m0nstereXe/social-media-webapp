const HttpError = require('../models/http-error');

const DUMMY_PLACES = [
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
    console.log('LIGMA');
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

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.find((p) => {
    console.log(p.creator + " " + userId);
    return p.creator === userId;
  });
  if (!places) {
    const error = new HttpError(
      "Could not find a place for the provided user ID",
      404
    );
    return next(error);
  }
  res.json({ places: places });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.printLigma = printLigma;