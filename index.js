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
const cookie = require("cookie");
const { promisify } = require("util");
const User = require("./src/model/User");
const jwt = require("jsonwebtoken");
const UserConversation = require("./src/model/UserConversation");

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

// CONNECT to mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

// SET router
apiRouter(app);

// CONFIG dotenv.env
dotenv.config();
const port = process.env.APP_PORT || 7171;

// MADE socket io
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:1010",
    credentials: true,
  },
});

io.on("connection", async (socket) => {
  let token = "";
  const cookieCheck = await socket.request.headers.cookie;
  const Check = cookie.parse(cookieCheck);
  // Get token from cookie
  if (Check && Check.authorization.startsWith("Bearer ")) {
    token = Check.authorization.split(" ")[1];
  }
  // 2. Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Check if user still exists
  const user = await User.findById(decoded.id);
  console.log(user.id);

  const conversation = await UserConversation.find({
    user_id: user._id,
  }).populate("conversation_id");

  const rooms = conversation.map(
    (userConversation) => userConversation.conversation_id
  );

  // rooms.map((room) => socket.join(room.id));

  socket.join("648d3a23eb33149a6fb66dac")
  socket.on("typing", (type) => {
    console.log(" b client is typing " + type);
  });

  // HANDLE joining a room
  socket.on("joinRoom", (conversationId) => {
    // const room = getRoomByConversationId(conversationId);
    console.log("join room " + conversationId);

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
    io.to(roomId).emit("message", { userId, value });
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected ");
  });
});
// END config socket io

// Function to get room identifier by conversationId
function getRoomByConversationId(conversationId) {
  return `room_${conversationId}`;
}

server.listen(port, () => {
  console.log("Hello world! " + port);
});
