const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const User = require("../../model/User");
const AppError = require("../../utils/appError");
const catchHandler = require("../../utils/catchHandler");

const makeToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.register = async (req, res, next) => {
  const newProduct = await User.create(req.body);

  if (!newProduct) {
    next(new AppError("Register error", 401));
  }

  res.status(201).json({
    status: "success",
    data: { newProduct },
  });
};

exports.getUser = catchHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("role_id");

  if (!user || user === null) {
    return next(new AppError("Register error", 401));
  }

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

exports.login = catchHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new AppError("Please provide email address and password.", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.CorrectPassword(password, user.password))) {
    return next(new AppError("Incorrect email address or password.", 400));
  }

  user.password = undefined;
  const token = makeToken(user._id);

  res.cookie("authorization", "Bearer " + token, {
    secure: false,
    httpOnly: true,
    expires: dayjs().add(7, "days").toDate(),
  });

  res.status(200).json({
    status: "success",
    token,
    data: { user },
  });
});

exports.checkUserIsLogin = catchHandler(async (req, res, next) => {
  // 1. Getting token and check of it's there
  let token;

  // Get token from cookie
  if (
    req.cookies.authorization &&
    req.cookies.authorization.startsWith("Bearer ")
  ) {
    token = req.cookies.authorization.split(" ")[1];
  }

  // Get token in headers
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer ")
  // ) {
  //   token = req.headers.authorization.split(" ")[1];
  // }

  if (!token) {
    return next(
      new AppError("You are not logged in, please login to  get access.", 401)
    );
  }

  // 2. Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  // 3. Check if user still exists
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(
      new AppError("You are not logged in, please login to  get access.", 401)
    );
  }

  // 4. Check if user changed password after the token was issued
  // if (user.checkTimeChangePassword(decoded.iat)) {
  //   return next(
  //     new AppError("User recently changed password!, please log in again.", 401)
  //   );
  // }

  res.user = user;
  next();
});

exports.getUserIsActive = catchHandler(async (req, res, next) => {
  const users = await User.find({ active: 1 }).populate("role_id");
  
  res.status(200).json({
    status: "success",
    data: users,
  });
});
