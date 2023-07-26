const os = require("os");
const cluster = require("node:cluster");
process.env.UV_THREADPOOL_SIZE = os.cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
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
  const Message = require("./src/model/Message");

  // Body Parser
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
  // app.use(helmet());
  // config helmet allow image
  app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
        "img-src": ["'self'", "https: data:"],
      },
    })
  );

  // CONNECT to mongodb
  mongoose
    .connect("mongodb://127.0.0.1:27017/admin", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.log(err));

  // console.log(mongoose.Query.prototype.exec)
  const exec = mongoose.Query.prototype.exec;
  mongoose.Query.prototype.exec = function () {
    // Tại prototype này của mongoose thì mọi câu query điều phải đi qua
    // Tại nơi này thì rất ok cho việc config redis cho data
    console.log("Number of CPU cores:", os.cpus().length);
    console.log("this is in prototype exec");
    return exec.apply(this, arguments);
  };

  // SET router
  apiRouter(app);

  // CONFIG dotenv.env
  dotenv.config();
  const port = process.env.APP_PORT || 3000;

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

    // JOIN to all room user has
    await joinToAllRooms(user, socket);

    socket.on("typing", (type) => {
      console.log(" b client is typing " + type);
    });

    // Handle chat messages
    socket.on("message", async (data) => {
      // STORE chat message to mongodb
      const fromSever = await Message.create({
        content: data.value,
        user_id: data.userId,
        conversation_id: data.roomId,
      });
      // EMIT TO client
      io.to(data.roomId).emit("messageFromSever", fromSever);
    });

    // EVENT client typing messages
    socket.on("disconnect", () => {
      console.log("A client disconnected ");
    });
  });
  // END config socket io

  const joinToAllRooms = async (user, socket) => {
    try {
      const conversations = await UserConversation.find({
        user_id: user.id,
      }).populate("conversation_id");

      const rooms = conversations.map(
        (userConversation) => userConversation.conversation_id
      );

      rooms.forEach((room) => {
        socket.join(room.id);
      });

      console.log("Rooms joined successfully");
    } catch (error) {
      console.error("Error joining rooms:", error);
    }
  };

  server.listen(port, () => {
    console.log("Hello world! " + port);
  });
}
