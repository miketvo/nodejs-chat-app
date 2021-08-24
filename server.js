const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const express = require("express");
const app = express();

uri = "mongodb://localhost/nodejs-chat-app";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, error => {
  console.log("Database connected");
});

const Message = mongoose.model("Message", {
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
  })
});

app.post("/messages", (req, res) => {
  const message = new Message(req.body);
  message.save(error => {
    console.log(`POST | ERR = ${error} | at ${Date()}`);
  });
  res.send(message);
});

const server = app.listen(8080, "localhost", () => {
  console.log("Server is running on: ", server.address());
});
