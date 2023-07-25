const Product = require("../model/Product");

class ProductController {
  async index(req, res) {
    const products = await Product.find({ active: 1 });
    console.log("start a event loop");

    // các hoạt động đọc ghi dự liệu cũng được cho mà một macrotask
    // In set Immediate (Macotask)
    setImmediate(() => {
      console.log("Macotask - Immediate");
    });

    // In set timeout (Macrotask)
    setTimeout(() => {
      console.log("set timeout ==> Macrotask");
    }, 900);

    // Process next tick (Microtask)
    process.nextTick(function () {
      console.log("Microtask process next tick");
    });

    // In set Interval (Macrotask)
    // setInterval(() => {
    //   console.log("set interval after 5 seconds");
    // }, 50000);

    // In Promise (Microtask)
    new Promise(function (resolve, reject) {
      console.log("resolve");
      resolve("1-2-3-4-5-6");
    }).then(function (val) {
      console.log("the function them", val);
    });

    Promise.resolve().then(() => {
      console.log("Promise Microtask 1");
    });

    Promise.resolve().then(() => {
      console.log("Promise Microtask 2");
    });

    console.log("End a event loop");
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
