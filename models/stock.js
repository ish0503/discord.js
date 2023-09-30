const { Schema, model } = require("mongoose");

const SchemaG = new Schema({
  name: String,
  desc: String,
  money: Number,
  percent: Number,
})

module.exports = model("stock", SchemaG);
