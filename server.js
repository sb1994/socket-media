const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { notFound, errorHandler } = require("./middleware/error");
const cors = require("cors");
require("dotenv").config();

// database conntection
const db = process.env.DB_CONNECT;
mongoose.connect(
  db,
  {
    useNewUrlParser: true,

    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    console.log("Mongo Db Connected");
  }
);

const app = express();
app.use(express.json());

app.use(express.json());
// setting the cross origin
app.use(cors());

//setup the middleware

app.use(bodyParser.urlencoded({ extended: false }));

const users = require("./api/routes/users");

// attaching the api routes to the app instance
app.use("/api/users", users);

// ataching the error middleware to the app instance
app.use(errorHandler);
app.use(notFound);

// setting the landing routes for the server in deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT);
