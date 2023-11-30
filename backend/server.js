// server.js file


"use strict";
require('dotenv').config();
const app = require("./app");
const PORT = process.env.PORT || 3000;



app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});
