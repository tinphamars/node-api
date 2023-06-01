class PostController {
  index(req, res) {
    res.send("how to install a post");
  }
}

module.exports = new PostController();
