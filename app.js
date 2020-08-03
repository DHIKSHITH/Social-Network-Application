const express = require("express");
const profileRoutes = require("./routes/profileRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const app = express();

app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);

module.exports = app;
