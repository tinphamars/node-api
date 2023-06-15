const http = require("http");
const cors = require("cors");
const app = require("express")();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");
const path = require("path");
const apiRouter = require("./src/web/index");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

// set template for application
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

app.use(
  cors({
    origin: "http://localhost:1010",
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(helmet());
// connect to mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

// set router
apiRouter(app);

// config dotenv.env
dotenv.config();

const port = process.env.APP_PORT || 7171;

// make socket io
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:1010",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("typing", (type) => {
    console.log(" b client is typing " + type);
  });

  // get cookies from client
  // check login here
  const cookie = socket.request.headers.cookie;

  socket.on("message", (message) => {
    message.value && io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected ");
  });
});
// end config socket io

server.listen(port, () => {
  console.log("Hello world! " + port);
});
