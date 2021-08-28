const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

uri = "mongodb://localhost/nodejs-chat-app";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, error => {
  console.log("Database connected");
});

io.on("connection", socket => {
  console.log("A user is connected", socket.id);
});

const Message = mongoose.model("Message", {
  socketID: String,
  name: String,
  content: String,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.get("/messages", (req, res) => {
  Message.find({}, (error, messages) => {
    res.send(messages);
    console.log(`GET ALL | ERR = ${error} | at ${Date()}`);
  });
});

app.post("/messages", (req, res) => {
  const message = new Message(req.body);
  message.save(error => {
    console.log(`POST | ERR = ${error} | at ${Date()}`);
  });
  io.emit("send-message", req.body);
  res.send(message);
});

const server = http.listen(8080, "0.0.0.0", () => {
  console.log("Server is running on: ", server.address());
});
