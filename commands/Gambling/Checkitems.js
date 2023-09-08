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
                content: `**아이템이 없으시군요.. \`/아이템\` 명령어로 아이템을 생성하세요.**`
            })
            return
        }

        const embed = new EmbedBuilder().setDescription(
            `**${
                interaction.user
            }님의 아이템**`
        ).setColor("Green")
        for (let i = 0; i < gambling_find.hashtags.length; i++){
            if (!gambling_find.hashtags.name) {continue}
            const item = await interaction.client.users.fetch(
                gambling_find.hashtags[i]
            )
            embed.addFields({
                name: `${i+1}. ${item.name}`,
                value: `${item.value} 강화`
            })
        }

        interaction.reply({embeds: [embed]})
    }
}
