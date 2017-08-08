const express = require("express");
const mustacheExpress = require("mustache-express");
const pgPromise = require("pg-promise");
const path = require("path");
const expressValidator = require("express-validator");
const data = require("./data.js");

const app = express();

app.use(express.static("public"));
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.get("/", function(req, res) {
  res.render("robots_list", data);
});

app.get("/robots_details/:username", (request, response) => {
  let username = request.params.username;
  let user = data.users.find(function(person) {
    return person.username === username;
  });
  response.render("people", user);
});

app.listen(3000, function() {
  console.log("Successfully accessed user directory!");
});
