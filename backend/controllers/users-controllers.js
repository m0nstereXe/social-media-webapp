const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  //should prob use the cursor here instead but whatever
  let users;
  try {
    users = await User.find({}, "name email places image");
  } catch (error) {
    return next(
      new HttpError("Fetching users failed please try again later!!!", 500)
    );
  }
  console.log(users);
  res.json({
    users: users.map((u) => {
      return u.toObject({ getters: true });
    }),
  });
};
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Make sure inputs are valid!!!!", 422));
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Signing up Failed. Try again later!", 500));
  }
  if (existingUser) {
    return next(new HttpError("User exists Already", 422));
  }
  const createdUser = new User({
    name,
    email,
    image: req.file.path,
    password,
    places: [],
  });

  console.log(createdUser);

  try {
    await createdUser.save();
  } catch (error) {
    //console.log(error);
    return next(new HttpError("Signing up failed please try again", 500));
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  //grabs email
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Logging in Failed. Try again later!", 500));
  }

  if (!existingUser || existingUser.password != password) {
    return next(new HttpError("Invalid Credentials!!!!", 401));
  }

  res.json({
    message: "logged in!",
    user: existingUser.toObject({ getters: true }),
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
