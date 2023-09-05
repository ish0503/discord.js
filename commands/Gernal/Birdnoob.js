const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("새늅교")
    .setDescription("새늅교에 대한 정보를 보여줍니다")
    async execute(interaction) {
      
            interaction.reply("새늅교는 9월 5일 창설되었다.")
  interaction.channel.send("사이트는 https://birdnoob.netlify.app/ 이며, 앞으로 더 내용이 추기될것이다.")
              }
