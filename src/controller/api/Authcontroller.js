const jwt = require('jsonwebtoken');

const User = require('../../model/User');
const AppError = require('../../utils/appError');
const catchHandler = require('../../utils/catchHandler');

// const makeToken = (userID) => {
//   console.log(userID);
// }

exports.register = async (req, res, next) => {
  const newProduct = await User.create(req.body);

  if (!newProduct) {
    next(new AppError('Register error', 401));
  }

  res.status(201).json({
    status: 'success',
    data: { newProduct }
  });
}


exports.getUser = catchHandler( async (req, res, next) =>{

  const user = await User.findById(req.params.id).populate("role_id");

  if (!user || user === null) {
    return next(new AppError('Register error', 401));
  }

  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })

  res.status(200).json({
    status: 'success',
    token,
    data: { user }
  });
})

exports.login = async ({ body }, res) => {
  try {
    const product = await new User(body).save();
    res.status(201).json({
      status: 'Create success !',
      data: { product }
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error processing request',
      error: error.message
    });
  }
}

// const checkLogin = (req, res, next) => {
//   // 1. Getting token and check of it's there
//   const userID = 10
//   makeToken(userID)
//   // 2. Verify token

//   // 3. Check if user still exists

//   // 4. Check if user changed password after the token was issued
//   next()
// }