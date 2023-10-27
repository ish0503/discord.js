const { Schema, model } = require("mongoose");

const SchemaF = new Schema({
  userid: String,
  money: Number,
  cooltime: String,
  //password: String,
})

module.exports = model("Gambling", SchemaF);
