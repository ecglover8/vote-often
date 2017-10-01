// require all dependencies
const express = require("express");
var router = express.Router();
var Polls = require("../models/polls");

// declare local variables
router.use("/", (req, res, next) => {
    res.locals.title = "Create";
    next();
});

// GET and POST methods
router.get("/", (req, res, next) => {
    res.render("create");
});
router.post("/", (req, res, next) => {
    // get variables from form submission
    var quest = req.body.question;
    var c1 = req.body.c1;
    var c2 = req.body.c2;
    // create array of choices from required fields
    var cho = [{ "val": c1, "count": 0 }, { "val": c2, "count": 0 }];
    // add optional choices to array
    if (req.body.c3) {
        var c3 = req.body.c3;
        cho.push({ "val": c3, "count": 0 });
    }
    if (req.body.c4) {
        var c4 = req.body.c4;
        cho.push({ "val": c4, "count": 0 });
    }
    if (req.body.c5) {
        var c5 = req.body.c5;
        cho.push({ "val": c5, "count": 0 });
    }
    // create new record in polls collection using polls schema
    var newPoll = Polls({
        question: quest,
        choices: cho,
        creator: res.locals.name
    });
    newPoll.save((err) => {
        if (err) throw err;
        res.redirect("/");
    });
});

// export all methods to the rest of the app
module.exports = router;