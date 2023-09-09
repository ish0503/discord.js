const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const gambling_Schema = require("../../models/Money")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("돈변경")
    .setDescription("대교주면 자신의 돈을 변경할수 있습니다.")
    .addIntegerOption((f) =>
        f
        .setName("변경돈")
        .setDescription("변경할 금액을 입력해주세요.")
        .setRequired(true)
        .setMinValue(0)
    ),
    /**
     * 
     * @param {import(*discord.js*).ChatInputCommandInteraction} interaction
     */
    async execute(interaction){
      if (!interaction.member.roles.cache.has('1148592261341397083')){
        interaction.reply({
                content: `**어딜 이 명령어를 쓸려고.**`
            })
        return
      }
        const bettingGold = interaction.options.getInteger("변경돈",true)
        const gambling_find = await gambling_Schema.findOne({
            userid:interaction.user.id
        })

        if (!gambling_find){
            interaction.reply({
                content: `**돈 데이터가 없으시군요.. \`/돈\` 명령어로 돈 데이터를 먼저 생성 후 해주세요.**`
            })
            return
        }

            await gambling_Schema.updateOne(
                {userid:interaction.user.id},
                {money: bettingGold}
            )

            const embed = new EmbedBuilder()
            .setTitle(`돈이 변경되었습니다!`)
            .setColor("Green")
            
            interaction.reply({embeds:[embed]})
        
    }
}
