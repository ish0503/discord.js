const { Schema, model } = require("mongoose");

const SchemaF = new Schema({
  userid: String,
  hashtags : [{ "channelid": String, "username": [String] }],
})

module.exports = model("Upgrade", SchemaF);
