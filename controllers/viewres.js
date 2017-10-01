// require all dependencies
const express = require("express");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var router = express.Router();
var Polls = require("../models/polls");
//var db = require("../db");

// declare local variables
router.use("/", (req, res, next) => {
    res.locals.title = "View";
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
        res.render("viewres", {
            record: rec[0]
        });
    });
});

// export all methods to the rest of the app
module.exports = router;