const { Schema, model } = require("mongoose");

const SchemaF = new Schema({
  data: String, //?
  userid: String, // 배우기 유저 id
  word: String, // 배우는 단어
  meaning: String, // 배운 단어의 뜻
})

module.exports = model("learning", SchemaF);