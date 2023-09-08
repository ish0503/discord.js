const { Schema, model } = require("mongoose");

const SchemaF = new Schema({
  userid: String,
  hashtags : { "default" : [{ "name": String, "value": Number }] },
  cooltime: String,
})

module.exports = model("Upgrade", SchemaF);
