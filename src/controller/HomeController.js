class HomeController {
  index(req, res) {
    res.render("login");
  }
}

module.exports = new HomeController();
