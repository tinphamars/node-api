const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ProductCategorySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
  },
  active: {
    type: Number,
    default: 1,
    required: true,
  },
});

ProductCategorySchema.plugin(uniqueValidator);
const ProductCategory = mongoose.model(
  "ProductCategory",
  ProductCategorySchema
);

module.exports = ProductCategory;
