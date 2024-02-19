const { Schema, model } = require("mongoose");

const SchemaF = new Schema({
  userid: String, // 돈 유저 id
  money: Number, // 돈
  cooltime: String, // 돈 쿨타임(100년 ㅋㅋ)
  
  //password: String,
})

module.exports = model("Gambling", SchemaF);
