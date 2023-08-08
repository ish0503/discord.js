const google = require('google-it')
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("구글검색")
    .setDescription("구글에서 나와있는 정보를 1~10까지 보여줍니다")
    .addStringOption(options => options
        .setName("검색어")
        .setDescription("검색어를 입력해주세요.")
        .setRequired(true)
    ),
    async execute(interaction) {
      const args = interaction.options.getString("검색어")

        interaction.reply("검색중입니다..")

        const Embed = new EmbedBuilder()
            .setTitle(`${args}에 대한 검색결과`)
            //.setColor("PURPLE")
            .setTimestamp()

        google({ 'query': args }).then(rufrhk => {
            rufrhk.forEach(function (item, index) {
                Embed.addFields({ name: 'Title', value: `${index + 1}. ${item.title} ` },  { name: 'link', value: `[바로가기](${item.link})`},)
                //Embed.addFields(`${index + 1}. ${item.title} `, `[바로가기](${item.link})`, inline = true)
            })
            interaction.channel.send({ embeds: [Embed] })
        }).catch(e => {
            return interaction.channel.send(`오류가 발생했습니다 ${e}`)
        })
    }
}
