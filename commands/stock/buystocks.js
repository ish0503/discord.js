const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const gambling_Schema = require("../../models/stock")
const gambling_Schema2 = require("../../models/stocker")
const money_Schema = require("../../models/Money")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("주식")
        .setDescription("주식 명령어입니다!")
        .addSubcommand(subcommand =>
              subcommand
              .setName("매수")
              .setDescription("주식을 매수해보세요!")
              .addStringOption(options => options
                  .setName("이름")
                  .setDescription("매수할 주식의 이름 입력해주세요.")
                  .setRequired(true)
              )
              .addIntegerOption(options => options
                .setName("주")
                .setDescription("매수할 주식의 주를 입력해주세요.")
                .setMinValue(1)
                .setRequired(true)
              ),
            )
        .addSubcommand(subcommand =>
              subcommand
              .setName("매도")
              .setDescription("주식을 매도해보세요!")
              .addStringOption(options => options
                  .setName("이름")
                  .setDescription("매도할 주식의 이름 입력해주세요.")
                  .setRequired(true)
              )
              .addIntegerOption(options => options
                .setName("주")
                .setDescription("매도할 주식의 주를 입력해주세요.")
                .setMinValue(1)
                .setRequired(true)
              ),
            )
        .addSubcommand(subcommand =>
            subcommand
            .setName("확인")
            .setDescription("가상 주식의 정보를 확인할 수 있습니다."),
            )
        .addSubcommand(subcommand =>
            subcommand
            .setName("보유확인")
            .setDescription("가상 주식 보유한것을 확인할 수 있습니다."),
            ),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === "매수") {
        const args = interaction.options.getString("이름")
        const args2 = interaction.options.getInteger("주")
        const gambling_find = await gambling_Schema2.findOne({
            userid:interaction.user.id
        })
        console.log(gambling_find)
        const money_find = await money_Schema.findOne({
            userid:interaction.user.id
        })
        console.log(money_find)
        const stock_find = await gambling_Schema.findOne({
            name:args
        })

        if (!stock_find){
            interaction.reply({
                content: `주식을 찾을수 없습니다. 제대로 입력했는지 확인해보세요.`,
            });
            return;
        }

        if (!money_find) return interaction.reply({
            embeds: [
              new (require("discord.js")).EmbedBuilder()
              .setTitle('SYSTEM API ERROR')
              .setDescription(`돈이 없습니다. /돈 으로 지원금을 받으세요.`)
              .setColor('Red')
            ],
            ephemeral: true
          })

        if (gambling_find){
            console.log("찾음")
            const canGiveTime = Number(gambling_find.cooltime) + (0.5 * 60 * 1000)
            if (canGiveTime && canGiveTime > Date.now()){
                interaction.reply({
                    content: `**주식 매수/매도 후에는 쿨타임이 있습니다.\n<t:${Math.round(
                        canGiveTime / 1000
                    )}> (<t:${Math.round(canGiveTime / 1000)}:R>)**`,
                });
                return;
            }

            var list = []
            let length = gambling_find.hashtags.length
            let isitem = -1
            for (let i = 0; i < length; i++){
                if (gambling_find.hashtags[i].name == args) {
                    isitem = i
                }else{
                    list.push(gambling_find.hashtags[i])
                }
            }
    
            if (isitem != -1){
                console.log("아이템 있음")
                list.push({ "name": args, "value": gambling_find.hashtags[isitem].value + args2 })
                if (!money_find || money_find.money < stock_find.money * args2){
                    const embed = new EmbedBuilder()
                            .setDescription(
                                `**돈이 부족합니다.**`
                            )
                            .setColor("Red");
                        
                            interaction.reply({embeds: [embed]});
                            return;
                }
        
                await money_Schema.updateOne(
                    {userid:interaction.user.id},
                    {money:money_find.money - stock_find.money * args2}
                )
        
                await gambling_Schema2.updateOne(
                    {userid: interaction.user.id},
                    {$set: {
                       hashtags : list,
                    },
                     cooltime: Date.now()},
                    {upsert:true}
                );

                const embed = new EmbedBuilder()
                    .setDescription(
                        `**재화를 주고 ${args}가 매수 되었습니다.**`
                    )
                    .setColor("Green");
                
                interaction.reply({embeds: [embed]});

                return
            }else{
                if (!money_find || money_find.money < stock_find.money * args2){
                    const embed = new EmbedBuilder()
                            .setDescription(
                                `**돈이 부족합니다.**`
                            )
                            .setColor("Red");
                        
                            interaction.reply({embeds: [embed]});
                            return;
                }
        
                await money_Schema.updateOne(
                    {userid:interaction.user.id},
                    {money:money_find.money - stock_find.money * args2}
                )
        
                await gambling_Schema2.updateOne(
                    {userid: interaction.user.id},
                    {$push: {
                       hashtags : 
                            [{ "name": args, "value": args2 }],
                    },
                     cooltime: Date.now()},
                    {upsert:true}
                );

                const embed = new EmbedBuilder()
                    .setDescription(
                        `**재화를 주고 ${args}가 매수 되었습니다.**`
                    )
                    .setColor("Green");
                
                interaction.reply({embeds: [embed]});

                return
            }
        }

        if (!money_find || money_find.money < stock_find.money * args2){
            const embed = new EmbedBuilder()
                    .setDescription(
                        `**돈이 부족합니다.**`
                    )
                    .setColor("Red");
                
                    interaction.reply({embeds: [embed]});
                    return;
        }

        await money_Schema.updateOne(
            {userid:interaction.user.id},
            {money:money_find.money - stock_find.money * args2}
        )

        await gambling_Schema2.updateOne(
            {userid: interaction.user.id},
            {$push: {
               hashtags : 
                    [{ "name": args, "value": args2 }],
            },
             cooltime: Date.now()},
            {upsert:true}
        );

        const embed = new EmbedBuilder()
            .setDescription(
                `**재화를 주고 ${args}가 매수 되었습니다.**`
            )
            .setColor("Green");
        
        interaction.reply({embeds: [embed]});
            
        }else if (interaction.options.getSubcommand() === "매도") {
            const args = interaction.options.getString("이름")
            const args2 = interaction.options.getInteger("주")
            const money_find = await money_Schema.findOne({
                userid:interaction.user.id
            })
            const gambling_find = await gambling_Schema2.findOne({
                userid:interaction.user.id
            })
            const stock_find = await gambling_Schema.findOne({
                name:args
            })
    
            console.log(gambling_find)

            if (!stock_find){
                interaction.reply({
                    content: `주식을 찾을수 없습니다. 제대로 입력했는지 확인해보세요.`,
                });
                return;
            }
            if (!money_find) return interaction.reply({
                embeds: [
                  new (require("discord.js")).EmbedBuilder()
                  .setTitle('SYSTEM API ERROR')
                  .setDescription(`돈이 없습니다. /돈 으로 지원금을 받으세요.`)
                  .setColor('Red')
                ],
                ephemeral: true
              })

            if (!gambling_find){
                interaction.reply({
                    content: `**주식이 없으시군요.. \`/주식 매수\` 명령어로 주식을 매수하세요.**`
                })
                return
            }

            if (stock_find.value - args2 < 0) {
                args2 = stock_find.value
            }
    
            let soondeleteitem = []
    
            let length = gambling_find.hashtags.length
            let isitem = -1
            for (let i = 0; i < length; i++){
                if (gambling_find.hashtags[i].name == args) {
                    isitem = i
                    if (gambling_find.hashtags[i].value - args2 >= 0) {
                        soondeleteitem.push({"name": gambling_find.hashtags[i].name, "value": gambling_find.hashtags[i].value - args2})
                    }
                }else{
                    soondeleteitem.push({"name": gambling_find.hashtags[i].name, "value": gambling_find.hashtags[i].value})
                }
            }
    
            if (isitem == -1){
                const embed = new EmbedBuilder()
                    .setDescription(
                        `**주식을 찾을 수 없습니다.. 공기라도 팔라는 건가요?**`
                    )
                    .setColor("Red");
                
                    interaction.reply({embeds: [embed]});
                    return;
            }

            await money_Schema.updateOne(
                {userid:interaction.user.id},
                {money:money_find.money + stock_find.money * args2}
            )
    
            console.log(soondeleteitem)
    
            await gambling_Schema2.updateOne(
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
                    `**${args}이(가) 성공적으로 매도되었습니다.**`
                )
                .setColor("Green");
            
            interaction.reply({embeds: [embed]});
        }else if (interaction.options.getSubcommand() === "확인") {
            const stockone = await gambling_Schema.findOne({
                name: "껌딱지 주식회사"
              })
              
              const stocktwo = await gambling_Schema.findOne({
                name: "새늅 주식회사"
              })
              
              const stockthree= await gambling_Schema.findOne({
                name: "로즈 주식회사"
              })
              
              const stockfour = await gambling_Schema.findOne({
                name: "토리 코퍼레이션"
              })
    
            const embed = new EmbedBuilder()
            .setTitle("주식 정보")
            .setColor("Green")
            .addFields(
                { name: stockone.name, value: `설명: ${stockone.desc}\n주가: ${stockone.money.toLocaleString()} (${stockone.percent}%) \n이미지: ${stockone.image}` , inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: stocktwo.name, value: `설명: ${stocktwo.desc}\n주가: ${stocktwo.money.toLocaleString()} (${stocktwo.percent}%) \n이미지: ${stocktwo.image}` , inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: stockthree.name, value: `설명: ${stockthree.desc}\n주가: ${stockthree.money.toLocaleString()} (${stockthree.percent}%) \n이미지: ${stockthree.image}` , inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: stockfour.name, value: `설명: ${stockfour.desc}\n주가: ${stockfour.money.toLocaleString()} (${stockfour.percent}%) \n이미지: ${stockfour.image}` , inline: true },
            )
    
            interaction.reply({embeds: [embed]})
        }else if (interaction.options.getSubcommand() === "보유확인") {
            const gambling_find = await gambling_Schema2.findOne({
                userid:interaction.user.id
            })
    
            if (!gambling_find){
                interaction.reply({
                    content: `**주식이 없으시군요.. \`/주식 매수\` 명령어로 주식을 매수하세요.**`
                })
                return
            }
    
            const embed = new EmbedBuilder().setDescription(
                `**${
                    interaction.user
                }님의 주식**`
            ).setColor("Green")
    
            let length = gambling_find.hashtags.length
            for (let i = 0; i < length; i++){
                console.log("반복"+i)
                console.log(gambling_find.hashtags[i])
                if (!gambling_find.hashtags[i]) { 
                    continue
                }
                var item = gambling_find.hashtags[i]
                const gambling_find2 = await gambling_Schema.findOne({
                    name:item.name
                })
                console.log(item)
                embed.addFields({
                    name: `${i+1}. ${item.name}`,
                    value: `**${item.value}주 (${(gambling_find2.money * item.value).toLocaleString()}재화)**`
                })
            }
    
            interaction.reply({embeds: [embed]})
        }
    }
}