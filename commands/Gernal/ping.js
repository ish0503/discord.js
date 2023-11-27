const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()

    .setName("핑")
    .setDescription("봇과 자신의 핑 확인"),
    /**
     * 
     * @param {import(*discord.js*).ChatInputCommandInteraction} interaction
     */
    async execute(interaction){
        await interaction.deferReply()

        const msg = await interaction.fetchReply()
        
        const embed = new EmbedBuilder()
        .setTitle(`🏓퐁! 응답이 왔어요!<:Heart:1151445619215441980>`)
        .setDescription(`🏓 커맨드 핑: ${msg.createdTimestamp - interaction.createdTimestamp}ms\n🏓 봇 핑 : ${interaction.client.ws.ping}ms`)
        .setColor(0xFFFF00)

        interaction.editReply({ embeds: [embed],  files: [{ attachment: 'https://i2.ruliweb.com/img/23/06/05/18886eea7a1573866.jpg' }] })
    }
}
