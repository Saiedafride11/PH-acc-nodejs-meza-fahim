const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json()); //or body parser
app.use(cors());


//routes
const tourRoute = require('./routes/tour.route');

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});


app.use('/api/v1', tourRoute);

module.exports = app;
