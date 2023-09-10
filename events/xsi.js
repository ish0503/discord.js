module.exports = {
  name: "messageCreate",
  once: false,
  async execute(interaction) {
    const Schema = require("../models/learning")
    const args = interaction.content.slice(1).trim().split(/ +/) 
    const argsjoin = args.join(" ")
    console.log(argsjoin)
    const ff = await Schema.findOne({ word: argsjoin })
    if (ff) {
      const meaning = ff.meaning
      //let user = userid//interaction.member
      if (!ff.userid) userid = "0"
      console.log(`${meaning} @${ff.userid}님이 알려주셨어요!`)
      interaction.channel.send(`**${meaning}** (<@${ff.userid}님이 알려주셨어요!>)`)
      //interaction.channel.recipientId(`\`${ff.meaning}``\n${user.tag || user}님이 알려주셨어요 !`)
      }
}}