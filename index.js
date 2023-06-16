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

function getCookies(string) {
  const array = string.split("; ");
  array.forEach((item) => {
    if(item.includes("authorization")) {
      return  item.split(" ")[1]
    }
  });
  return null;
}

io.on("connection", (socket) => {
  socket.on("typing", (type) => {
    console.log(" b client is typing " + type);
  });

  // get cookies from client
  // check login here
  const cookie = socket.request.headers.cookie;
  console.log("cookie: ", getCookies(cookie));
  // socket.on("message", (message) => {
  //   message.value && io.emit("message", message);
  // });

  // Handle joining a room
  socket.on("joinRoom", (conversationId) => {
    // const room = getRoomByConversationId(conversationId);
    socket.join(conversationId);
    console.log(`User joined room: ${conversationId}`);
  });

  // Handle leaving a room
  socket.on("leaveRoom", (conversationId) => {
    const room = getRoomByConversationId(conversationId);
    socket.leave(room);
    console.log(`User left room: ${room}`);
  });

  // Handle chat messages
  socket.on("message", (data) => {
    const { roomId, value, userId } = data;
    console.log(data);
    // const room = getRoomByConversationId(conversationId);
    io.to(roomId).emit("message", { userId, value });
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected ");
  });
});
// end config socket io

// Function to get room identifier by conversationId
function getRoomByConversationId(conversationId) {
  return `room_${conversationId}`;
}

server.listen(port, () => {
  console.log("Hello world! " + port);
});
