const { Schema, model } = require("mongoose");

const SchemaF = new Schema({
  filterserver: String,
  adminroleid: [String],
  filtermsg: [String],
  filterchannel: [String],
  filterallchannel: Boolean,
})

module.exports = model("filter", SchemaF);