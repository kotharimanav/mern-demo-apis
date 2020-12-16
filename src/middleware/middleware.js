const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("./cors");
const helmet = require("./helmet");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors);
app.use(helmet);

module.exports = app;
