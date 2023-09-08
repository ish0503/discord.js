const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const gambling_Schema = require("../../models/upgrade")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("아이템확인")
    .setDescription("자기가 직접 만들도 강화한 아이템들을 확인할 수 있습니다."),

    /**
     * 
     * @param {import(*discord.js*).ChatInputCommandInteraction} interaction
     */
    async execute(interaction){
        const gambling_find = await gambling_Schema.findOne({
            userid:interaction.user.id
        })

        if (!gambling_find){
            interaction.reply({
                content: `**돈이 없으시군요.. \`/돈\` 명령어로 새냥신의 은총을 받으세요.**`
            })
            return
        }

        const embed = new EmbedBuilder().setDescription(
            `**${
                interaction.user
            }님의 재화는 총 ${gambling_find.money.toLocaleString()}입니다.**`
        ).setColor("Green")

        interaction.reply({embeds: [embed]})
    }
}
