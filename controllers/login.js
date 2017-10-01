// require all dependencies
const express = require("express");
const store = require("store");
var router = express.Router();
var Polls = require("../models/polls");
var Users = require("../models/users");

// declare local variables
router.use("/", (req, res, next) => {
    res.locals.title = "Login";
    next();
});
// GET and POST methods
router.get("/", (req, res, next) => {
    res.render("login");
    next();
});
router.post("/", (req, res) => {
    // get variables from form submission
    var uname = req.body.username;
    var password = req.body.password;
    // make sure user exists in collection
    Users.findOne({ username: uname }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.locals.errmsg = "This user does not exist in the database. Please try again.";
            res.render("login");
            return;
        }
        // make sure password is correct for user
        if (password !== user.password) {
            res.locals.errmsg = "Password is not correct. Please try again.";
            res.render("login");
            return;
        } else {
            // set username throughout scope of project and send to main page
            store.set("user", { name: uname });
            Polls.find({}).exec((err, polls) => {   
                if (err) throw err;
                res.redirect("/");
            });
        }
    });
});

// export all methods to the rest of the app
module.exports = router;