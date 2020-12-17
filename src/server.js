const app = require("express")();
const routes = require("./routes/routes");
const config = require("./config");
const middleware = require("./middleware");
const DbConnection = require("./utils/db/db.config");

//server connection check by url
app.get("/", (req, res) => {
  res.json({ message: "server connected" });
});

//middleware configuration
app.use(middleware);

//db connection
DbConnection.connection();

//app routes
app.use(routes);

const server = app.listen(config.get("port") || process.env.PORT, () => {
  console.log("server running on port:", server.address().port);
});
