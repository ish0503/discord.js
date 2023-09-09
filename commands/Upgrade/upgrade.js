const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const gambling_Schema = require("../../models/upgrade")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("아이템")
        .setDescription("아이템 명령어입니다!")
        .addSubcommand(subcommand =>
              subcommand
              .setName("생성")
              .setDescription("자신만의 아이템을 창작해보세요!")
              .addStringOption(options => options
                  .setName("이름")
                  .setDescription("아이템의 이름 입력해주세요.")
                  .setRequired(true)
              ),
            )
        .addSubcommand(subcommand =>
              subcommand
              .setName("삭제")
              .setDescription("아이템을 삭제합니다.")
              .addStringOption(options => options
                  .setName("이름")
                  .setDescription("아이템의 이름 입력해주세요.")
                  .setRequired(true)
              ),
            )
        .addSubcommand(subcommand =>
            subcommand
            .setName("강화")
            .setDescription("자신만의 아이템을 강화해보세요!")
            .addStringOption(options => options
                .setName("이름")
                .setDescription("아이템의 이름 입력해주세요.")
                .setRequired(true)
            ),
            )
        .addSubcommand(subcommand =>
            subcommand
            .setName("확인")
            .setDescription("자기가 직접 만들고 강화한 아이템들을 확인할 수 있습니다."),
            )
        .addSubcommand(subcommand =>
            subcommand
            .setName("순위")
            .setDescription("아이템 강화 횟수로 순위를 봅니다."),
            ),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === "강화") {
            const args = interaction.options.getString("이름")
        const gambling_find = await gambling_Schema.findOne({
            userid:interaction.user.id
        })

        if (gambling_find){
            const canGiveTime = Number(gambling_find.cooltime) + (1 * 60 * 1000)
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
        let hasitem = []
        
        for (let i = 0; i < length; i++){
            if (gambling_find.hashtags[i].name == args) {
                isitem = i
            }else{
                hasitem.push({"name": gambling_find.hashtags[i].name, "value": gambling_find.hashtags[i].value})
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

        const random_number = Math.round(Math.random() * 10000)
        const random_upgrade = Math.round(Math.random() * 9) + 1 // 1에서 10사이

        if (random_number > gambling_find.hashtags[isitem].value ** 2){
            hasitem.push({ "name": args, "value": gambling_find.hashtags[isitem].value + random_upgrade})
            await gambling_Schema.updateOne(
                {userid: interaction.user.id},
                {$set:{
                   hashtags : hasitem,
                cooltime: Date.now()}},
                {upsert:true}
            );
    
            const embed = new EmbedBuilder()
                .setTitle(
                    `**강화 확률: ${(10000 - (gambling_find.hashtags[isitem].value ** 2)) / 100}%**`
                )
                .setDescription(
                    `**강화 성공! 이름: ${args}, 강화 수: ${gambling_find.hashtags[isitem].value} -> ${gambling_find.hashtags[isitem].value + random_upgrade}**`
                )
                .setColor("Green");
            
            interaction.reply({embeds: [embed]});
        }else{
            hasitem.push({ "name": args, "value": 0})
            await gambling_Schema.updateOne(
                {userid: interaction.user.id},
                {$set:{
                   hashtags : hasitem,
                cooltime: Date.now()}},
                {upsert:true}
            );
    
            const embed = new EmbedBuilder()
                .setTitle(
                    `**강화 확률: ${(10000 - (gambling_find.hashtags[isitem].value ** 2)) / 100}%**`
                )
                .setDescription(
                    `**강화 실패.. 이름: ${args}, 강화 수: 0**`
                )
                .setColor("Red");
            
            interaction.reply({embeds: [embed]});
        }
        }else if (interaction.options.getSubcommand() === "생성") {
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

        if (gambling_find){
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
                `**아이템이 생성 되었습니다. 이름: ${args}, 강화 수: 0**`
            )
            .setColor("Green");
        
        interaction.reply({embeds: [embed]});
            
        }else if (interaction.options.getSubcommand() === "삭제") {
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
        }else if (interaction.options.getSubcommand() === "확인") {
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
    
            let length = gambling_find.hashtags.length
            for (let i = 0; i < length; i++){
                console.log("반복"+i)
                console.log(gambling_find.hashtags[i])
                if (!gambling_find.hashtags[i]) { 
                    continue
                }
                var item = gambling_find.hashtags[i]
                console.log(item)
                embed.addFields({
                    name: `${i+1}. ${item.name}`,
                    value: `강화수 : **${item.value}**`
                })
            }
    
            interaction.reply({embeds: [embed]})
        }else if (interaction.options.getSubcommand() === "순위") {
            // const gambling_find = await gambling_Schema.findOne({
            //     userid:interaction.user.id
            // })

            const gambling_find = await gambling_Schema
            .find()
            .sort([["value"]])
            .limit(10)
            .exec();
    
            const embed = new EmbedBuilder()
            .setTitle(`${interaction.client.user.username} 강화 순위`)
            .setColor("Green")
            .setThumbnail(interaction.client.user.displayAvatarURL());
    
            let save = []

            for (let i = 0; i < Object.keys(gambling_find).length; i++){
                //console.log(gambling_find[i].userid)
                let json3  = JSON.parse(JSON.stringify(gambling_find[i].hashtags));
                for (let v = 0; v < Object.keys(json3).length; v++){
                    if (json3[v]){
                        //console.log("ㅡㅡㅡㅡㅡㅡㅡㅡv있음")
                        //console.log(json3[v])
                        json3[v]["userid"] = gambling_find[i].userid
                        //console.log(json3[v])
                    }else if(json3){
                        //console.log("ㅡㅡㅡㅡㅡㅡㅡㅡv없음")
                        //console.log(json3)
                        json3["userid"] = gambling_find[i].userid
                        //console.log(json3)
                    }
                }
                save.push(...json3)
            }

            //console.log(save)

            save.sort(function (a, b) {
                if (a.value > b.value) {
                  return -1;
                }
                if (a.value < b.value) {
                  return 1;
                }
                // a must be equal to b
                return 0;
              });
             console.log(save)
            // console.log(Object.keys(save).length)
            // console.log(save[1])
            for (let i = 0; i < Object.keys(save).length; i++){
                const user = await interaction.client.users.fetch(
                    save[i].userid
                )
                embed.addFields({
                    name: `${i + 1}. ${user.username}`,
                    value: `${save[i].name} : ${save[i].value}강화`
                })
            }
    
            interaction.reply({embeds : [embed]})
        }
    }
}