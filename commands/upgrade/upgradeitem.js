const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const gambling_Schema = require("../../models/upgrade")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("아이템강화")
    .setDescription("자신만의 아이템을 강화해보세요!")
    .addStringOption(options => options
        .setName("이름")
        .setDescription("아이템의 이름 입력해주세요.")
        .setRequired(true)
    ),
     
    /**
     * 
     * @param {import(*discord.js*).ChatInputCommandInteraction} interaction
     */
    async execute(interaction){
        const args = interaction.options.getString("이름")
        const gambling_find = await gambling_Schema.findOne({
            userid:interaction.user.id
        })

        if (gambling_find){
            const canGiveTime = Number(gambling_find.cooltime) + (1 * 60 * 1000)
            if (canGiveTime && canGiveTime > Date.now()){
                interaction.reply({
                    content: `**아이템 강화 후에는 1분 쿨타임이 있습니다.\n<t:${Math.round(
                        canGiveTime / 1000
                    )}> (<t:${Math.round(canGiveTime / 1000)}:R>)**`,
                });
                return;
            }
        }
        let length = gambling_find.hashtags.length
        let isitem = -1
        for (let i = 0; i < length; i++){
            if (gambling_find.hashtags[i].name == args) {
                isitem = i
            }
        }

        if (isitem == -1){
            const embed = new EmbedBuilder()
                .setDescription(
                    `**당신에게 없는 아이템을 강화하라구요? 참나**`
                )
                .setColor("Red");
            
                interaction.reply({embeds: [embed]});
                return;
        }

        await gambling_Schema.updateOne(
            {userid: interaction.user.id},
            {
               hashtags : 
                    [{ "name": args, "value": gambling_find.hashtags[isitem].value + 1 }],
            cooltime: Date.now()},
            {upsert:true}
        );

        const embed = new EmbedBuilder()
            .setDescription(
                `**강화 성공! 이름: ${args}, 강화 수: ${gambling_find.hashtags[isitem].value + 1}**`
            )
            .setColor("Green");
        
        interaction.reply({embeds: [embed]});
            
    }
}