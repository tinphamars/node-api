const mongoose = require("mongoose");

const ConversationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The field name is required"],
      minlength: 3,
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", ConversationSchema);
module.exports = Conversation;
