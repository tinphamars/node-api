const express = require("express");

const route = express.Router();
const AuthController = require("../controller/api/AuthController");
const ConversationController = require("../controller/api/ConversationController");

route.get("/", AuthController.checkUserIsLogin, ConversationController.conversation);

module.exports = route;
