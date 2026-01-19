const express = require("express");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
require("dotenv").config();
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors({
  origin: process.env.FRONTEND_URL, // set in .env for deploy
  credentials: true,
}));

connectDB();
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
