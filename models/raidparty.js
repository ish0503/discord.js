const { Schema, model } = require("mongoose");

const SchemaF = new Schema({
    "channelid": String,
    "userid": [String]
})

module.exports = model("raidparty", SchemaF);