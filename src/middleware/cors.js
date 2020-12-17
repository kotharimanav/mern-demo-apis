const cors = require("cors");
const config = require("../config");
const app = require("express")();

const options = {
  origin: config.get("cors.origin"),
  methods: config.get("cors.methods"),
  allowedHeaders: config.get("cors.allowedHeaders"),
  optionsSuccessStatus: config.get("cors.successPorts")
};

app.use(cors());

// app.use(cors(options));
// app.use(helmet());

module.exports = app;
