const { Schema, model } = require("mongoose");

const SchemaF = new Schema({
  userid: String,
  money: Number,
  cooltime: String,
})

module.exports = model("Gambling", SchemaF);