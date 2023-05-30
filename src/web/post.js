const express = require('express')

const route = express.Router()
const PostController = require('../controller/PostController')

// GET request to /api/products
route.get('/', PostController.index)

// POST request to /api/products
route.post('/', PostController.index)

// PUT request to /api/products:id
route.put('/:id', PostController.index)

// DELETE request to /api/products:id
route.delete('/:id', PostController.index)
module.exports = route