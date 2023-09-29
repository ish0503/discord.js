const client = require("../index")
const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  once: false,
  /**
     * 
     * @param {import("discord.js").Message} interaction
     */
  async execute(interaction) {
    if (interaction.author.bot)
        return;
    const Schema = require("../models/learning")
    // const args = interaction.content.slice(1).trim().split(/ +/) 
    // const argsjoin = args.join(" ")
    // const ff = await Schema.findOne({ word: argsjoin })
    if (interaction.content.substr(0, 2) == "야 ") {
      const ffs = await Schema.find().exec()
      const include_word = []

      for (let i = 0; i < ffs.length; i++){
        if (interaction.content.includes(ffs[i].word)){
          include_word.push(ffs[i])
        }
      }

      if (include_word.length > 0){
        const randomword = include_word[Math.floor(Math.random() * include_word.length)]
        const meaning = randomword.meaning
        if (!randomword.userid) userid = "0"
        const username = client.users.cache.get(randomword.userid);
        if (username){
          interaction.channel.send(`**${meaning}** (${username.username}[${username.globalName}]님이 알려주셨어요!<:Heart:1157259695329906758>)`)
        }else{
          interaction.channel.send(`**${meaning}** (<@${randomword.userid}>]님이 알려주셨어요!<:Heart:1157259695329906758>)`)
        }
        }
      }else if(interaction.content.startsWith("!골라")) {
        const args = interaction.content.slice("!".length).trim().split(/ +/),
          list = args.slice(1);
    
        if (!list.length) return interaction.reply("선택지를 입력해주세요!");
    
        const index = Math.floor(Math.random() * list.length);
    
        interaction.reply(`저의 선택은 \`${list[index]}\` 입니다`);
      }
}}
