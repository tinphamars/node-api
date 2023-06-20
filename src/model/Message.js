const mongoose = require("mongoose");

const User = require("./User");
const Conversation = require("./Conversation");

const MessageSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "The field name is required"],
      minlength: 1,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: User,
    },
    conversation_id: {
      type: mongoose.Types.ObjectId,
      ref: Conversation,
    },
    is_remove: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
