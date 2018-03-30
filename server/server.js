const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const debug = require('debug')('APP:server')
const app = express();


// morgan logging utility
app.use(morgan("combined"));
// specify view engine & static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client"));
app.use(express.static(path.join(__dirname, "../client")));
// body parser
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
// mongoose
mongoose.connect(process.env.DB_CONN);

// router
var router = require("./routes/routes.js");
app.use('/', router);

module.exports = app;