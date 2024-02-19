const { Schema, model } = require("mongoose");

const SchemaG = new Schema({
  continentname: String, // 대륙이름
  minopentime: Number, // 대륙여는시간 시작
  maxopentime: Number, // 대륙여는시간 끝
  companys: [{
    type: String, // 회사 타입(무역, 농사)
    name: String, // 회사 이름
    desc: String, // 회사 설명
    money: Number, // 회사 주가
    lastmoney: Number, // 회사 이전 주가(늘어나고 줄어든 주가 퍼센트로 나타내기 위함)
    firstmoney: Number, // 변하지 않는 정해진 처음가격 (주가 랜덤 변화량을 조절하기 위함. 아마도 레벨이 높아지면 이 변화량도 높아질듯)
    ceo: String, // 회사 ceo
    perworkpay: Number, // 일 한번 할때마다 돈 자동 주는거
    level: Number, // 회사 레벨
    calculation: Number, // 회사 연산량
    lastmaxbuy: Number, //남은 발행 개수(남은 주식량)
    allmaxbuy: Number, //남은 총 발행 개수(더 발행할 수 있는 주식량)
    employee: [String], //직원 id 배열
  }]
},
{ typeKey: '$type' })

module.exports = model("stock", SchemaG);
