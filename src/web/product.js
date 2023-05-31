const express = require('express')

const route = express.Router()
const ProductController = require('../controller/api/ProductController')

// GET request to /api/products
route.get('/', ProductController.products)

// POST request to /api/products
route.post('/', ProductController.create)

// GET request to /api/products/:id
route.get('/:id', ProductController.getId)

// PUT request to /api/products/:id
// route.put('/:id', ProductController.index)

// DELETE request to /api/products/:id
// route.delete('/:id', ProductController.index)
module.exports = route