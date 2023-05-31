const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const RoleSchema = mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'The field name is unique'],
    required: [true, "The field name is required"],
  },
  display_name: {
    type: String,
    required: [true, "The field display name is required"],
  }
})

RoleSchema.plugin(uniqueValidator);

const Role = mongoose.model('Role', RoleSchema)
module.exports = Role