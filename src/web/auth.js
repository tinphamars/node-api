const express = require("express");

const route = express.Router();
const AuthController = require("../controller/api/AuthController");

// GET request to /api/users
route.post("/register", AuthController.register);

// POST request to /api/users
route.post("/login", AuthController.login);

// GET request to /api/users/:id
route.get("/:id", AuthController.checkUserIsLogin, AuthController.getUser);

// GET request to /api/users
route.get("/", AuthController.checkUserIsLogin, AuthController.getUserIsActive);

// PUT request to /api/user:id
// route.put('/:id', PostController.index)

// DELETE request to /api/products:id
// route.delete('/:id', PostController.index)

// ADD friend to /api/users/friend
route.post("/friend", AuthController.checkUserIsLogin, AuthController.friend);
// GET all room of user /api/users/friend
route.get("/get/friend", AuthController.checkUserIsLogin, AuthController.room);


module.exports = route;
