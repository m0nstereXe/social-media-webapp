const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Nick Belov",
    email: "test@test.com",
    password: "poop123",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return  next(new HttpError("Make sure inputs are valid!!!!", 422));
  }

  const { name, email, password,places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError('Signing up Failed. Try again later!',500));
  }
  if(existingUser)
  {
    return next(new HttpError('User exists Already',422));
  }
  const createdUser = new User({
    name,
    email,
    image: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/twitter/233/orangutan_1f9a7.png',
    password,
    places
  });

  try {
    await createdUser.save();
  } catch(error)
  {
    return next(new HttpError('Signing up failed please try again',500));
  }

  res.status(201).json({ user: createdUser.toObject({getters: true}) });
};
const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identify user credientials, seem to be wrong."
    );
  }

  res.json({ message: "logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
