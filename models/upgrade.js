const { Schema, model } = require("mongoose");

const SchemaF = new Schema({
  userid: String,
  hashtags : [{ "name": String, "value": Number }],
  skills : [{ "name": String, "Lv": Number }],
  cooltime: String,
  defense: Number,
})

module.exports = model("Upgrade", SchemaF);