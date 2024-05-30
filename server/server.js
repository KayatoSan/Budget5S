// IMPORT
const mongoose = require("mongoose").mongoose.connect(
  "mongodb://mongo:27017/budget5s"
);
const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const bodyParser = require("body-parser");

// ROUTES
const financeRoutes = require("./routes/finance");
const editDataRoutes = require("./routes/edit");

// CRUD
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
  })
);

// ROUTES CALL
app.use(financeRoutes, editDataRoutes);

// 🚀 LAUNCH
http.listen(3000, () => {
  console.log("🚀 Started on 3000");
});
