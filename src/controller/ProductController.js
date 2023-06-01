const Product = require("../model/Product");

class ProductController {
  async index(req, res) {
    const products = await Product.find({ active: 1 });
    res.render("product-list", { products });
  }

  create(req, res) {
    res.render("product-create", { isEdit: false });
  }

  async post(req, res) {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      rating: req.body.rating,
      active: req.body.active,
      img: req.body.img,
    });

    product
      .save()
      .then((doc) => {
        if (doc) {
          res.redirect("/admin/product-list");
        }
      })
      .catch((error) => {
        res.status(500).json({
          error: error.message,
        });
      });
  }

  delete(req, res) {
    console.log(req.params.id);
    Product.findByIdAndDelete(req.params.id)
      .then((message) => {
        if (message) {
          res.redirect("/admin/product-list");
        }
      })
      .catch((error) => {
        res.send(error.message);
      });
  }

  async update(req, res) {
    const product = await Product.findById(req.params.id);
    res.render("product-create", { product: product, isEdit: true });
  }

  async edit(req, res) {
    const newProduct = {
      name: req.body.name,
      price: req.body.price,
      rating: req.body.rating,
      active: req.body.active,
      img: req.body.img,
    };
    const product = await Product.findByIdAndUpdate(req.body.id, newProduct, {
      new: true,
    });

    if (product) {
      res.redirect("/admin/product-list");
    } else {
      res.send({ message: "Update fail" });
    }
  }
}

module.exports = new ProductController();
