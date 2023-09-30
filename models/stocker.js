const { Schema, model } = require("mongoose");

const SchemaF = new Schema({
  userid: String,
  hashtags: [{ "name": String, "value": Number, "lastvalue": Number }],
  cooltime: String,
})

module.exports = model("stocker", SchemaF);
