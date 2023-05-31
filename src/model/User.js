const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const Role = require('./Role');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "The field name is required"],
    minlength: 3
  },
  email: {
    type: String,
    unique: [true, 'The field email is unique'],
    required: [true, "Please provide your email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, "Please provide your password"],
    select: false
  },
  role_id: {
    type:  mongoose.Types.ObjectId,
    ref: Role
  },
  active: {
    type: Number,
    default: 1,
    required: true
  },
  avatar: {
    type: String,
  }
})

UserSchema.pre('save', async function(next){
  if(!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 12)
  return next()
})

UserSchema.plugin(uniqueValidator);
const User = mongoose.model('User', UserSchema)

module.exports = User