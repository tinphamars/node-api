const mongoose = require("mongoose");

const User = require("./User");
const Conversation = require("./Conversation");

const UserConversationSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: User,
    },
    conversation_id: {
      type: mongoose.Types.ObjectId,
      ref: Conversation,
    },
  },
  { timestamps: true }
);

const UserConversation = mongoose.model(
  "UserConversation",
  UserConversationSchema
);
module.exports = UserConversation;
