const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 3
  },
  price: {
    type: Number
  },
  rating: {
    type: Number,
    default: 5
  },
  active: {
    type: Number,
    default: 1,
    required: true
  },
  img: {
    type: String,
  }
})

ProductSchema.plugin(uniqueValidator);
const Product = mongoose.model('Product', ProductSchema)

module.exports = Product