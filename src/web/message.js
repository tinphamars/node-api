const express = require("express");

const route = express.Router();
const AuthController = require("../controller/api/AuthController");
const MessageController = require("../controller/api/MessageController");

// GET ALL message in a room /api/messages
route.get(
  "/:id",
  AuthController.checkUserIsLogin,
  MessageController.messageInARoom
);

module.exports = route;
