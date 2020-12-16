const helmet = require("helmet");
const app = require("express")();

app.use(helmet.noCache());

app.use(helmet.dnsPrefetchControl());

app.use(helmet.noSniff());

app.use(helmet.hidePoweredBy());

app.use(helmet.xssFilter());

module.exports = app;
