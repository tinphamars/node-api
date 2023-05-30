const app = require("express")();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const apiRouter = require("./src/web/index");

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set template for application
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// connect to mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

// set router
apiRouter(app);

// config dotenv.env
dotenv.config();

const port = process.env.APP_PORT || 1111;

app.listen(port, () => {
  console.log("Hello world!");
});
