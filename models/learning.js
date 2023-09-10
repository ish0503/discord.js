const { Schema, model } = require("mongoose");

const SchemaF = new Schema({
  data: String,
  userid: String,
  word: String,
  meaning: String,
})

module.exports = model("learning", SchemaF);