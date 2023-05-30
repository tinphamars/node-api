const Product = require('../../model/Product');

class ProductController {

  async products(req, res) {
    const products = await Product.find({ active: true });
    res.status(200).json({
      status: 'success',
      length: products.length,
      data: { products }
    });
  }

  async update({ body }, res) {
    try {
      const product = await new Product(body).save();
      res.status(201).json({
        status: 'Create success !',
        data: { product }
      });
    } catch (error) {
      res.status(500).json({
        status: 'Error processing request',
        error: error.message
      });
    }
  }

  async create(req, res, next) {
    const newProduct = await Product.create(req.body);
    if (newProduct) {
      res.status(201).json({
        status: 'success',
        data: { newProduct }
      });
    }
  }

  delete(req, res) {
    Product.findOneAndDelete(req.params.id).then((message) => {
      if (message) {
        res.redirect('/admin/product-list');
      }
    }).catch((error) => {
      res.send(
        error.message
      )
    });
  }

  async edit(req, res) {
    const newProduct = {
      name: req.body.name,
      price: req.body.price,
      rating: req.body.rating,
      active: req.body.active,
      img: req.body.img,
    }
    const product = await Product.findByIdAndUpdate(req.body.id, newProduct, {
      new: true
    })

    if (product) {
      res.redirect('/admin/product-list')
    } else {
      res.send({ message: "Update fail" })
    }
  }
}

module.exports = new ProductController()