const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const gambling_Schema = require("../../models/upgrade")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("아이템")
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
            {
                hashtags : [
                    { "name": args, "value": 1 },
               ],
            }, //inserted data is the object to be inserted 

                //{hashtags: [
          //  { name: args, value: 1 },
         //   ]},
            { cooltime: Date.now()},
            {upsert:true}
        );

        console.log("저장 끝")

        const embed = new EmbedBuilder()
            .setDescription(
                `**아이템이 생성/바뀌게 되었습니다. 이름: ${
                    (gambling_find.hashtags[gambling_find.hashtags.length - 1].name)
                }, 레벨: ${gambling_find.hashtags[gambling_find.hashtags.length - 1].value}**`
            )
            .setColor("Green");
        
        interaction.reply({embeds: [embed]});
            
    }
}
