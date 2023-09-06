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
      const args = interaction.options.getString("검색어")

        await interaction.deferReply();

        const Embed = new EmbedBuilder()
            .setTitle(`${args}에 대한 검색결과`)
            //.setColor("PURPLE")
            .setTimestamp()

        google({ 'query': args }).then(rufrhk => {
            rufrhk.forEach(function (item, index) {
                Embed.addFields({ name: '제목', value: `${index + 1}. ${item.title} ` },  { name: '링크', value: `[바로가기](${item.link})`},)
                //Embed.addFields(`${index + 1}. ${item.title} `, `[바로가기](${item.link})`, inline = true)
            })
            interaction.channel.send(`https://birdmeow.netlify.app/`)
        }).catch(e => {
            return interaction.channel.send(`오류가 발생했습니다 ${e}`)
        })
    }
}
