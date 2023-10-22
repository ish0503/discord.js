const { Schema, model } = require("mongoose");

const SchemaF = new Schema({
  userid: String,
  hashtags : [{ "channelid": String, "userid": [String] }],
})

module.exports = model("raidparty", SchemaF);