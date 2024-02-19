const { Schema, model } = require("mongoose");
// 유저 주식 데이터
const SchemaF = new Schema({
  userid: String, // 유저 id
  continents: [{
    name: String, // 대륙 이름
    stocks: [{
      name: String, // 주식 이름
      value: Number, // 주식 주 개수
      lastvalue: Number // 마지막으로 산 주식의 총 가격(퍼센트로 나타내기 위함)
    }]
  }]
})

module.exports = model("stocker", SchemaF);