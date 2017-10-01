//require all dependencies
const express = require("express");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const store = require("store");
var router = express.Router();
var Polls = require("../models/polls");

// declare local variables
router.use("/", (req, res, next) => {
    res.locals.title = res.locals.name + "'s Page";
    next();
});

// GET and POST methods
router.get("/", (req, res, next) => {
    // show all polls created by this user
    Polls.find({ creator: res.locals.name }).exec((err, polls) => {   
        if (err) throw err;
        res.render("personal", {
            polls: polls
        });
        next();
    });
});
router.post("/pdelete", (req, res, next) => {
    // convert string id into mongo objectid
    var pid = req.body.id;
    var objectid = ObjectId(pid);
    // delete record from collection
    Polls.remove({ "_id": objectid }).exec((err, ok) => {
        if (err) throw err;
        res.redirect("/personal");
    });
});
router.post("/preset", (req, res, next) => {
    // convert string id into mongo objectid
    var pid = req.body.id;
    var objectid = ObjectId(pid);
    // create empty array and object to hold reset values
    var newArray = [];
    var obj = {};
    // get record of interest
    Polls.find({ "_id": objectid }).exec((err, poll) => {
        if (err) throw err;
        // copy all choices and replace current count with 0
        var choices = Array.from(poll[0].choices);
        for (var i = 0; i < choices.length; i++) {
            obj.val = choices[i].val;
            obj.count = 0;
            newArray.push(obj);
            obj = {};
        }
        // update record with new object of choices set to 0
        Polls.update({ "_id": objectid }, { $set: { "choices": newArray }}).exec((err, data) => {
            if (err) throw err;
            console.log(data);
            res.redirect("/personal");
            next();
        });
    });
});
router.post("/pvote", (req, res, next) => {
    // make sure a radio button was selected
    if (!req.body.choice) {
        res.locals.errmsg = "You must choose an option in order to vote.";
        res.render("/personal");
        return;
    }
    // convert string id into mongo objectid
    var pid = req.body.id;
    var objectid = ObjectId(pid);
    // convert choice into dot notation expression for update
    var p3 = req.body.choice + ".count";
    var update = {};
    update["choices."+ p3] = 1;
    // add 1 to appropriate choice in record by ID
    Polls.update({ "_id": objectid }, { $inc: update }).exec((err, data) => {
        if (err) throw err;
        console.log(data);
    });
    res.redirect("/personal");
    next();
});

// export all methods to the rest of the app
module.exports = router;