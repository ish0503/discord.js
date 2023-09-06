const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("site")
        .setDescription("사이트의 정보입니다.") 
    .addStringOption(options => options
        .setName("aa")
        .setDescription("aa")
    async execute(interaction) {
        await interaction.deferReply();
        interaction.channel.send("**https://birdmeow.netlify.app/**")
    },
};
