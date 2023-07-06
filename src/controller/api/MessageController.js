const catchHandler = require("../../utils/catchHandler");
const Message = require("../../model/Message");
const UserConversation = require("../../model/UserConversation");

exports.messageInARoom = catchHandler(async (req, res, next) => {
  // 01. CHECK current user is in the room
  const userBelongToRoom = await UserConversation.findOne({
    user_id: req.user._id,
    conversation_id: req.params.id,
  });

  if (!userBelongToRoom) {
    res.status(401).json({
      status: "error",
      message: "You are not allowed to join this conversation",
    });
  }

  // 02. GET all message in the room
  const conversation = await Message.find({
    conversation_id: req.params.id,
  })
    // .limit(100)
    .sort({ createdAt: 1 });

  res.status(200).json({
    status: "success",
    data: conversation,
  });
});
