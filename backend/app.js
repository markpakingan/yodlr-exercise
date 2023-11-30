// app.js file

"use strict";

const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware to parse JSON request bodies
app.use(express.json());

// const plantListRoutes = require("./routes/plantListRoutes");
const { authenticateJWT, ensureLoggedIn } = require("./middleware/auth");

app.use(cors());

// app.use(authenticateJWT);
app.use("/user", userRoutes);
// app.use("/plantlist", plantListRoutes);
app.use("/auth", authRoutes);

module.exports = app