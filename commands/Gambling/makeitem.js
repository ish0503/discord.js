const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const gambling_Schema = require("../../models/upgrade")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("아이템")
    .setDescription("자신만의 아이템을 창작해보세요!"),

    /**
     * 
     * @param {import(*discord.js*).ChatInputCommandInteraction} interaction
     */
    async execute(interaction){
        const gambling_find = await gambling_Schema.findOne({
            userid:interaction.user.id
        })

        if (gambling_find){
            const canGiveTime = Number(gambling_find.cooltime) + (2 * 60 * 1000)
            if (canGiveTime && canGiveTime > Date.now()){
                interaction.reply({
                    content: `**아이템 생성 후에는 2분 쿨타임이 있습니다.\n<t:${Math.round(
                        canGiveTime / 1000
                    )}> (<t:${Math.round(canGiveTime / 1000)}:R>)**`,
                });
                return;
            }
        }

        await gambling_Schema.updateOne(
            {userid: interaction.user.id},
            {items: (gambling_find?.items || 0) + 5000, cooltime: Date.now()},
            {upsert:true}
        );

        const embed = new EmbedBuilder()
            .setDescription(
                `**💰 자비로운 새냥신이 당신께 드리는 선물입니다. (+ 5000재화.) ${
                    (gambling_find?.money || 0) + 5000
                }재화가 새냥신의 은총 덕분에 당신에게 있습니다.**`
            )
            .setColor("Green");
        
        interaction.reply({embeds: [embed]});
            
    }
}
