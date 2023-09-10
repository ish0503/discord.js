const { Schema, model } = require("mongoose");

const SchemaF = new Schema({
  userid: String,
  word: String,
  meaning: String,
})

module.exports = model("learning", SchemaF);