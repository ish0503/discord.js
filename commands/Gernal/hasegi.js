const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("site")
    .setDescription("사이트의 정보입니다")
  async execute(interaction) {
    try {
      interaction.reply({ content: "https://birdmeow.netlify.app/" });
    } catch (error) {
      interaction.reply({ content: "전송하지 못했습니다" });
    }
  },
};
