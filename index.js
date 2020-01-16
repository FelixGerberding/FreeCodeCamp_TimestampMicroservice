const express = require("express");
const app = express();
var cors = require("cors");

// to validate date
Date.prototype.isValid = function() {
  return this.getTime() === this.getTime(); // NaN === NaN --> false
};

// Express Middleware
app.use(cors({ optionSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/timestamp/:date_string?", function(req, res) {
  if (req.params.date_string == null) {
    var d = new Date();
  } else {
    var d = new Date(req.params.date_string);
  }

  if (d.isValid()) {
    res.json({ unix: d.getTime(), utc: d.toUTCString() });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// Starting the server obviously
app.listen(3000);
