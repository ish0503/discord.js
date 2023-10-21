const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const gambling_Schema = require("../../models/Money")
const heart_Sechma = require("../../models/level")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("정보확인")
    .setDescription("당신의 돈의 총액을 확인할 수 있습니다."),

    /**
     * 
     * @param {import(*discord.js*).ChatInputCommandInteraction} interaction
     */
    async execute(interaction){
        const gambling_find = await gambling_Schema.findOne({
            userid:interaction.user.id
        })

        const heart_find = await heart_Sechma.findOne({
            userid:interaction.user.id
        })

        if (!gambling_find){
            interaction.reply({
                content: `**돈이 없으시군요.. \`/돈\` 명령어로 돈을 받으세요.**`
            })
            return
        }

        const embed = new EmbedBuilder().setDescription(
            `**${
                interaction.user
            }님의 재화는 총 ${Number(gambling_find.money).toLocaleString()}입니다.**\n
            lv: ${Number(heart_find.level).toLocaleString()}, xp: ${Number(heart_find.exp).toLocaleString()}`
        ).setColor("Green")

        interaction.reply({embeds: [embed]})
    }
}
