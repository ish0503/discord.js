const client = require("../index")

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(interaction) {
    const Schema = require("../models/learning")
    const args = interaction.content.slice(1).trim().split(/ +/) 
    const argsjoin = args.join(" ")
    const ff = await Schema.findOne({ word: argsjoin })
    if (ff && interaction.content.substr(0, 1) == "야") {
      const meaning = ff.meaning
      //let user = userid//interaction.member
      if (!ff.userid) userid = "0"
      const username = client.users.cache.get(ff.userid);
      if (username){
        interaction.channel.send(`**${meaning}** (${username.username}[${username.globalName}]님이 알려주셨어요!<:Heart:1151445619215441980>)`)
      }else{
        interaction.channel.send(`**${meaning}** (<@${ff.userid}>]님이 알려주셨어요!<:Heart:1151445619215441980>)`)
      }
      
      //interaction.channel.recipientId(`\`${ff.meaning}``\n${user.tag || user}님이 알려주셨어요 !`)
      }else if(message.content.startsWith("!골라")) {
    const args = message.content.slice("!".length).trim().split(/ +/),
      list = args.slice(1);

    if (!list.length) return message.reply("선택지를 입력해주세요!");

    const index = Math.floor(Math.random() * list.length);

    message.reply(`저의 선택은 \`${list[index]}\` 입니다`);
  }
}}
