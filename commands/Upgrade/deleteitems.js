const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const gambling_Schema = require("../../models/upgrade")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("아이템삭제")
    .setDescription("아이템을 삭제합니다.")
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

        if (!gambling_find){
            interaction.reply({
                content: `**아이템이 없으시군요.. \`/아이템\` 명령어로 아이템을 생성하세요.**`
            })
            return
        }

        let soondeleteitem = []

        let length = gambling_find.hashtags.length
        let isitem = -1
        for (let i = 0; i < length; i++){
            if (gambling_find.hashtags[i].name == args) {
                isitem = i
            }else{
                soondeleteitem.push({"name": gambling_find.hashtags[i].name, "value": gambling_find.hashtags[i].value})
            }
        }

        if (isitem == -1){
            const embed = new EmbedBuilder()
                .setDescription(
                    `**아이템을 찾을 수 없습니다.. 공기라도 없애라는 건가요?**`
                )
                .setColor("Red");
            
                interaction.reply({embeds: [embed]});
                return;
        }

        console.log(soondeleteitem)

        await gambling_Schema.updateOne(
            {userid: interaction.user.id},
            {$set: {
                hashtags: soondeleteitem//[{"name": null}]
                    //{ "name": args, "value": 0 },
            },
             cooltime: Date.now()},
            {upsert:true}
        );

        // $push: {
        //     quizzes: {
        //        $each: [ { wk: 5, score: 8 }, { wk: 6, score: 7 }, { wk: 7, score: 6 } ],
        //        $sort: { score: -1 },
        //        $slice: 3
        //     }
        //   }

        //{ "name": args, "value": 0}

        //gambling_Schema.findOneAndRemove({name : gambling_find.hashtags[isitem]})

        const embed = new EmbedBuilder()
            .setDescription(
                `**아이템이 성공적으로 삭제 되었습니다. 이름: ${args}**`
            )
            .setColor("Green");
        
        interaction.reply({embeds: [embed]});
            
    }
}