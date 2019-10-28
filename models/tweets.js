const mongoose = require("mongoose");
const schema = mongoose.Schema;

const TweetSchema = new Schema({
    owner: { type: Schema.Types.ObjectID, ref: "user"},
    content: String,
    created: { type: Date, default: Date.now}
});

module.exports = mongoose.model("Tweets", TweetSchema);