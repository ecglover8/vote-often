// require all dependencies
const express = require("express");
const store = require("store");
var router = express.Router();
var Users = require("../models/users");
//var db = require("../db");

// declare local variables
router.use("/", (req, res, next) => {
    res.locals.title = "Register";
    next();
});

// GET and POST methods
router.get("/", (req, res, next) => {
    res.render("register");
});
router.post("/", (req, res, next) => {
    // get variables from form submission
    var uname = req.body.username;
    var p1 = req.body.password1;
    var p2 = req.body.password2;
    // make sure password and password confirmation match
    if (p1 !== p2) {
        res.locals.errmsg = "Password does not match with confirmation. Please try again.";
        res.render("register");
        return;
    }
    // save new user to user collection using user schema
    var newUser = Users({
        username: uname,
        password: p1
    });
    newUser.save((err) => {
        if (err) {
            // make sure this username is not already taken
            if (err.name === "MongoError" && err.code === 11000) {
                res.locals.errmsg = "A user with that name already exists in the database. Please try again.";
                res.render("register");
                return;
            }
            throw err;
        }
        // set username throughout scope of project and send to main page
        store.set("user", { name: uname });
        res.redirect("/");
    });
});

// export all methods to the rest of the app
module.exports = router;