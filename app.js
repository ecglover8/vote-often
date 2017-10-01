// require all dependencies
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

// require database
const database = require("./config/database");

// include parsing of requests to server
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));

// set directories, view engine, and locations
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));

// setup routing directories
const create = require("./controllers/create");
const edit = require("./controllers/edit");
const index = require("./controllers/index");
const login = require("./controllers/login");
const personal = require("./controllers/personal");
const register = require("./controllers/register");
const viewres = require("./controllers/viewres");
app.use("/", index);
app.use("/create", create);
app.use("/edit", edit);
app.use("/login", login);
app.use("/personal", personal);
app.use("/register", register);
app.use("/viewres", viewres);

// connect to database and start listening
var port = process.env.PORT || 8080;
mongoose.connect(database.url, {
    useMongoClient: true,
    }, (err) => {
    if (err) {
        throw new Error("Database failed to connect!");
    } else {
        app.listen(port, (err) => {
            if (err) {
                return console.log("Oops. Something bad happened. " + err + ".");
            }
            console.log("This app is now listening on port #" + port + ".");
        });
        console.log("Database is connected on port #27017.");
    }
});