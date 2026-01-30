const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let messages = [];

// ইউজার মেসেজ পাঠাবে
app.post("/send", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });
  const newMessage = { id: Date.now(), text, reply: "" };
  messages.push(newMessage);
  res.json({ success: true });
});

// অ্যাডমিন সব মেসেজ দেখবে
app.get("/messages", (req, res) => {
  res.json(messages);
});

// অ্যাডমিন রিপ্লাই দিবে
app.post("/reply", (req, res) => {
  const { id, reply } = req.body;
  const msg = messages.find(m => m.id === Number(id));
  if (msg) {
    msg.reply = reply;
    return res.json({ success: true });
  }
  res.status(404).json({ error: "Not found" });
});

// Render-এর জন্য পোর্ট ও হোস্ট বাইন্ডিং
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
