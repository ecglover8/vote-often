// require all dependencies
const express = require("express");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var router = express.Router();
var Polls = require("../models/polls");

// declare local variables
router.use("/", (req, res, next) => {
    res.locals.title = "Edit";
    next();
});

// GET and POST methods
router.get("/:id", (req, res, next) => {
    // convert string id into mongo objectid
    var pid = req.params.id;
    var objectid = ObjectId(pid);
    // find record by ID and send to page
    Polls.find({ "_id": objectid }).exec((err, rec) => {
        if (err) throw err;
        res.render("edit", {
            record: rec[0]
        });
    });
});
router.post("/:id", (req, res) => {
    var newopt = req.body.newopt;
    // convert string id into mongo objectid
    var pid = req.body.id;
    var objectid = ObjectId(pid);
    // push new choice onto choices array of record
    Polls.update({ "_id": objectid }, { $push: { choices: { "val": newopt, "count": 0 }}}).exec((err, data) => {
        if (err) {
            console.log(err);
        }
        console.log(data);
    });
    res.redirect("/");
});

// export all methods to the rest of the app
module.exports = router;