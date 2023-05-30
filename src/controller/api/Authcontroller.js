const Product = require('../../model/Product');

const makeToken = (userID) => {
  console.log(userID);
}

class AuthController {

  async register(req, res) {
    try {
      const products = await Product.find({ active: true });
      res.status(200).json({
        status: 'success',
        length: products.length,
        data: { products }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async login({ body }, res) {
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

  async checkLogin(req, res, next) {
    // 1. Getting token and check of it's there
    const userID = 10
    makeToken(userID)
    // 2. Verify token  

    // 3. Check if user still exists

    // 4. Check if user changed password after the token was issued
    next()
  }
}

module.exports = new AuthController()