const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const User = require("../../model/User");
const AppError = require("../../utils/appError");
const catchHandler = require("../../utils/catchHandler");
const UserConversation = require("../../model/UserConversation");
const Conversation = require("../../model/Conversation");

exports.conversation = catchHandler(async (req, res, next) => {
  const conversation = await UserConversation.find({
    user_id: req.user._id,
  }).populate("conversation_id");

  const data = conversation.map(
    (userConversation) => userConversation.conversation_id
  );

  res.status(201).json({
    status: "success",
    data: data,
  });
});
