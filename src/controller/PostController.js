class PostController {
  index(req, res) {
    res.send("how to create a post");
  }
}
module.exports = new PostController();
