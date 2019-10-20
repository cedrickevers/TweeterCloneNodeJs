const mongoose = require("mongoose"),
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{ type:String, unique: true, lowercase :true},
    name:String,
    password:String,
    photo: String,
    tweets: [{
        tweet: {type: Schema.Types.ObjectID, ref: "Tweet"}]
    }
})
module.Exports = mongoose.model("User", UserSchema)