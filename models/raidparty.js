const { Schema, model } = require("mongoose");

const SchemaF = new Schema({
  hashtags : [{ "channelid": String, "userid": [String] }],
})

module.exports = model("raidparty", SchemaF);