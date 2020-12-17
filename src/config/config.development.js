const convict = require("convict");

const config = convict({
  port: {
    doc: "application port",
    format: Number,
    default: 3001,
    arg: "port"
  },
  dbUrl: {
    doc: "monogdb database url",
    format: String,
    default:
      "mongodb://localhost:27017/demo",
    arg: "db-url"
  },
  securityKey: {
    doc: "authentication key",
    format: String,
    default: "randomkey",
    arg: "security-key"
  },
  saltRound: {
    doc: "salt round value",
    format: Number,
    default: 10,
    arg: "salt-round"
  },
  cors: {
    origin: {
      doc: "allowed origins",
      format: Array,
      default: ["http://localhost:3000/"],
      arg: "origin"
    },
    methods: {
      doc: "allowed methods",
      format: Array,
      default: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
      arg: "methods"
    },
    allowedHeaders: {
      doc: "allowed headers",
      format: Array,
      default: ["Content-Type", "Authorization"],
      arg: "headers"
    },
    successPorts: {
      doc: "allowed ports",
      format: Number,
      default: 200,
      arg: "option success port"
    }
  }
});

module.exports = config;
