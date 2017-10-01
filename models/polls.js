var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var pollsSchema = new Schema({
    question: { type: String, required: true, unique: true },
    choices: { type: [{}], required: true },
    creator: { type: String, required: true },
}, { collection: "polls" });

var Polls = mongoose.model("Polls", pollsSchema);

module.exports = Polls;