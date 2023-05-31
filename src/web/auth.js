const express = require('express')

const route = express.Router()
const AuthController = require('../controller/api/AuthController')

// GET request to /api/products
route.post('/', AuthController.register)

// POST request to /api/products
route.post('/', AuthController.login)

// GET request to /api/products/:id
route.get('/:id', AuthController.getUser)

// PUT request to /api/products:id
// route.put('/:id', PostController.index)

// DELETE request to /api/products:id
// route.delete('/:id', PostController.index)

module.exports = route