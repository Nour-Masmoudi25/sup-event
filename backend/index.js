const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // Frontend's local URL
  credentials: true,
}));

app.use(session({
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Use true only in production/HTTPS
}));

// Simple demo users
const users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    req.session.user = { username };
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.get("/api/profile", (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));