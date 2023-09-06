const google = require('google-it')
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("site")
    .setDescription("사이트의 정보입니다")
    .addStringOption(options => options
        .setName("검색어")
         .setDescription("검색어를 입력해주세요.")
         .setRequired(true)
    ),
    async execute(interaction) {
        await interaction.deferReply();

        interaction.channel.send(`https://birdmeow.netlify.app/`)
    }
}
