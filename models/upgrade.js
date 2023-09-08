const { Schema, model } = require("mongoose");

const SchemaF = new Schema({
  userid: String,
  hashtags : { type : Array , "default" : [] },
  cooltime: String,
})

module.exports = model("Upgrade", SchemaF);
