const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")

const imgs = [
    "https://i2.ruliweb.com/img/23/06/05/18886eea7a1573866.jpg",
    "https://i3.ruliweb.com/img/23/06/05/18886efdca2573866.jpg",
    "https://i3.ruliweb.com/img/23/06/05/18886efae9e573866.jpg",
    "https://i2.ruliweb.com/img/23/06/05/18886ef8039573866.jpg",
    "https://i1.ruliweb.com/img/23/06/05/18886ef4e64573866.jpg",
    "https://i1.ruliweb.com/img/23/06/05/18886eed4d9573866.jpg",
    "https://i2.ruliweb.com/img/23/06/05/18886ee40de573866.jpg",
    "https://i2.ruliweb.com/img/23/06/05/18886ee7855573866.jpg",
    "https://i2.ruliweb.com/img/23/06/05/18886f079ad573866.jpg",
]

function getrandomImage(){
    const min = 1
    const max = 10
    const randomNumber = Math.floor(Math.random() * (max - min))
    if (imgs[randomNumber]){
        return imgs[randomNumber]
    }else {
        return "https://i2.ruliweb.com/img/23/06/05/18886eea7a1573866.jpg"
    }
}


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

        interaction.editReply({ embeds: [embed],  files: [{ attachment: getrandomImage() }] })
    }
}
