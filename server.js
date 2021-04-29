const app = require("express")();
const cors=require('cors')
const port=process.env.PORT || 3000;
const httpServer = require("http").createServer(app);

app.use(cors({
  origin: "https://devvicktor.github.io"
}))
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "https://devvicktor.github.io",
    methods: ["GET", "POST"],
  },
  transports : ['polling']
});
io.on("connection", (socket) => {
  // server-side
  console.log("a user connected");
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  socket.on("connect", () => {
    console.log(socket.connected); // true
  });
  //send message
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
  //disconneted
  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
    console.log("user disconnected");
  });
});
httpServer.listen(port, () => {
  console.log("listening on *:3000");
});
