const express = require('express')

const route = express.Router()
const catchHandler = require('../utils/catchHandler')
const ProductController = require('../controller/api/ProductController')

// GET request to /api/products
route.get('/', catchHandler(ProductController.products))

// POST request to /api/products
route.post('/', catchHandler(ProductController.create.bind(ProductController)))

// PUT request to /api/products/:id
// route.put('/:id', ProductController.index)

// DELETE request to /api/products/:id
// route.delete('/:id', ProductController.index)
module.exports = route