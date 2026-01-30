const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// CORS কনফিগারেশন - এটি আপনার ফ্রন্টএন্ডকে ডাটা এক্সেস করতে দিবে
app.use(cors());
app.use(bodyParser.json());

let messages = [];

// ১. ইউজার মেসেজ পাঠাবে
app.post("/send", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  const newMessage = {
    id: Date.now(),
    text,
    reply: ""
  };
  messages.push(newMessage);
  res.json({ success: true, message: "Message received!" });
});

// ২. অ্যাডমিন প্যানেলের জন্য সব মেসেজ গেট করা
app.get("/messages", (req, res) => {
  res.json(messages);
});

// ৩. অ্যাডমিন রিপ্লাই দিবে
app.post("/reply", (req, res) => {
  const { id, reply } = req.body;
  const msg = messages.find(m => m.id === Number(id) || m.id === id);
  
  if (msg) {
    msg.reply = reply;
    return res.json({ success: true });
  }
  
  res.status(404).json({ error: "Message not found" });
});

// ৪. গুরুত্বপূর্ণ পরিবর্তন: Render এর পোর্টের জন্য dynamic port সেট করা
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
