const { Schema, model } = require("mongoose");

const SchemaF = new Schema({
  userid: String,
  heart: Number,
})

module.exports = model("Heart", SchemaF);
