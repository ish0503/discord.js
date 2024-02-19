const { Schema, model } = require("mongoose");

const SchemaF = new Schema({
  filterserver: String, // 필터 서버
  adminroleid: [String], // 필터에 구애받지 않는 어드민 직업 id
  filtermsg: [String], // 필터되는 메시지
  filterchannel: [String], // 필터되는 채널
  filterallchannel: Boolean, // 모든 채널 필터 되는지 여부
})

module.exports = model("filter", SchemaF);