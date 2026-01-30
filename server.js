const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let messages = [];

// user sends message
app.post("/send", (req, res) => {
  const { text } = req.body;
  messages.push({
    id: Date.now(),
    text,
    reply: ""
  });
  res.json({ success: true });
});

// admin gets messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

// admin replies
app.post("/reply", (req, res) => {
  const { id, reply } = req.body;
  const msg = messages.find(m => m.id === id);
  if (msg) msg.reply = reply;
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
