const express = require("express");
var path = require('path')

const pendulumRefresh = require("../apis/routes/pendulumRefresh.js");
const getPendulums = require("../apis/routes/getPendulums.js");
const setPendulums = require("../apis/routes/setPendulums.js");

const app = express();
app.pends={"HELLO":"HELLO"}
app.use(express.static(__dirname+'/../frontend/'));
app.use("/refresh", pendulumRefresh);
app.use("/getPendulums", getPendulums);
app.use("/setPendulums", setPendulums);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname+'/../frontend/index.html'));
});

app.listen(80);

