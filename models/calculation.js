const { Schema, model } = require("mongoose");
// 유저 연산력 데이터
const SchemaF = new Schema({
  userid: String, // 유저 id
  calculation: Number, // 연산력
  career: Number // 경력
})

module.exports = model("calculation", SchemaF);