const express = require("express");
const mustacheExpress = require("mustache-express");
const pgPromise = require("pg-promise")();
const path = require("path");
const expressValidator = require("express-validator");

const app = express();

const database = pgPromise({ database: "robots_db" });

app.use(express.static("public"));
// boiler-plate for validator
app.use(expressValidator());
// boiler-plate for mustache
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.get("/", function(request, response) {
  database.any("SELECT * FROM robots").then(rows => {
    const data = {
      robots: rows
    };
    response.render("robots_list", data);
  });
});

app.get("/robots_details/:username", (request, response) => {
  let username = request.params.username;
  let user = data.users.find(function(person) {
    return person.username === username;
  });
  response.render("people", user);
});

app.listen(3000, function() {
  console.log("Successfully accessed robots directory!");
});
