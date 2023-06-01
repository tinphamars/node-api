const Product = require("../../model/Product");
const AppError = require("../../utils/appError");
const catchHandler = require("../../utils/catchHandler");

exports.products = catchHandler(async (req, res, next) => {
  const products = await Product.find({ active: true });

  res.status(200).json({
    status: "success",
    length: products.length,
    data: { products },
  });
});

exports.create = catchHandler(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  if (!newProduct) {
    next(new AppError("Create not found", 401));
  }

  res.status(201).json({
    status: "success",
    data: { newProduct },
  });
});

exports.getId = catchHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    next(new AppError("Page not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { product },
  });
});
