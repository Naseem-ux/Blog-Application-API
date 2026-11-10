const express = require("express");
const dotenv = require("dotenv");
const crypt = require("crypto")
console.log(crypt.randomBytes(32).toString('hex'))

const {dbConnection} = require("./config/db");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Database connection
dbConnection();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));

// Default route
app.get("/", (req, res) => {
  res.send("Blog API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});