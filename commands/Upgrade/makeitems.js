const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const gambling_Schema = require("../../models/upgrade")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("아이템생성")
    .setDescription("자신만의 아이템을 창작해보세요!")
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

        console.log(gambling_find)

        if (gambling_find){
            const canGiveTime = Number(gambling_find.cooltime) + (2 * 60 * 1000)
            if (canGiveTime && canGiveTime > Date.now()){
                interaction.reply({
                    content: `**아이템 강화/생성 후에는 쿨타임이 있습니다.\n<t:${Math.round(
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

        if (isitem != -1){
            const embed = new EmbedBuilder()
                .setDescription(
                    `**이미 당신에게 있는 아이템을 또 생성할 수 없습니다.**`
                )
                .setColor("Red");
            
                interaction.reply({embeds: [embed]});
                return;
        }

        await gambling_Schema.updateOne(
            {userid: interaction.user.id},
            {$push: {
               hashtags : 
                    [{ "name": args, "value": 0 }],
            },
             cooltime: Date.now()},
            {upsert:true}
        );

        const embed = new EmbedBuilder()
            .setDescription(
                `**아이템이 생성 되었습니다. 이름: ${args}, 강화 수: 1**`
            )
            .setColor("Green");
        
        interaction.reply({embeds: [embed]});
            
    }
}