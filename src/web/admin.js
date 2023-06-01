const express = require("express");
const HomeController = require("../controller/HomeController");
const ProductController = require("../controller/ProductController");

const route = express.Router();

route.get("/product-list", ProductController.index);
route.post("/product/post", ProductController.post);
route.get("/product/create", ProductController.create);
route.get("/product/delete/:id", ProductController.delete);
route.get("/product/edit/:id", ProductController.update);
route.post("/product/edit", ProductController.edit);
route.get("/", HomeController.index);

module.exports = route;
