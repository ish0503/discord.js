const { Schema, model } = require("mongoose");

const SchemaF = new Schema({
  userid: String,
  level: Number,
  exp: Number,
})

module.exports = model("Level", SchemaF);
