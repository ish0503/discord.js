const {
    SlashCommandBuilder,
    EmbedBuilder
  } = require("discord.js");
  const gambling_Schema = require("../../models/Money")
  const gambling_Schema2 = require("../../models/upgrade")
  const level_Sechma = require("../../models/level")
  const comma = require("comma-number");
const { table } = require("node:console");
  const wait = require('node:timers/promises').setTimeout;

  var cooldown = []
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("피빕")
      .setDescription("PVP.")
      .addUserOption(options => options
        .setName("유저")
        .setDescription("선전포고할 유저를 선택하세요.")
        .setRequired(true)
    ),
    /**
     *
     * @param {import("discord.js").ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply()
        const args = interaction.options.getMember("유저")

        console.log(args.id)
        console.log(args.name)

        const gambling_find = await gambling_Schema.findOne({
            userid:interaction.user.id
        })

        const level_find = await level_Sechma.findOne({
            userid:interaction.user.id
        })

        const gambling_find3 = await gambling_Schema.findOne({
            userid:args.id
        })

        const level_find3 = await level_Sechma.findOne({
            userid:args.id
        })

        if (!gambling_find || !gambling_find3){
            interaction.editReply({
                content: `**당신이나 상대방의 돈 데이터가 없습니다.. 얻을게 없는데 PVP를 왜 하죠?**`
            })
            return
        }

        if (!level_find || !level_find3){
            interaction.editReply({
                content: `**당신이나 상대방의 레벨 데이터가 없습니다.. 얻을게 없는데 PVP를 왜 하죠?**`
            })
            return
        }

        if (cooldown.find((element) => element == interaction.user.id)){
            interaction.editReply({
                content: `**현재 이미 명령어를 실행하고 있습니다.**`
            })
            return
        }

        cooldown.push(interaction.user.id)

        let save = []

        let save2 = []
        
        const gambling_find2 = await gambling_Schema2.findOne({
            userid:interaction.user.id
        })

        const gambling_find4 = await gambling_Schema2.findOne({
            userid:interaction.user.id
        })

        if (gambling_find2){
            let length = gambling_find2.hashtags.length
            for (let i = 0; i < length; i++){
                if (!gambling_find2.hashtags[i]) { 
                    continue
                }
                var item = gambling_find2.hashtags[i]
                save.push(item)
            }
        }

        if (gambling_find4){
            let length = gambling_find4.hashtags.length
            for (let i = 0; i < length; i++){
                if (!gambling_find4.hashtags[i]) { 
                    continue
                }
                var item = gambling_find4.hashtags[i]
                save2.push(item)
            }
        }

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

          save2.sort(function (a, b) {
            if (a.value > b.value) {
              return -1;
            }
            if (a.value < b.value) {
              return 1;
            }
            // a must be equal to b
            return 0;
          });

        var damage

        var damage2

        if (save.length <= 0){
            damage = 1
        }else{
            damage = save[0].value
        }

        if (save2.length <= 0){
            damage2 = 1
        }else{
            damage2 = save2[0].value
        }
          
        const monster = { name: save2[0].name, hp: save2[0].value * 10, reward: Math.round(gambling_find3.money / 100000), XPreward:Math.round(level_find3.money / 1000) };
        const user = { name: save[0].name, hp: save[0].value * 10, reward: Math.round(gambling_find.money / 100000), XPreward:Math.round(level_find.money / 1000) };
        if (save.length <= 0){
            interaction.editReply(`${monster.name}을(를) 가지고 있는 ${args.name}을(를) 만났다! \n(당신의 무기: 맨주먹)`);
        }else{
            interaction.editReply(`${monster.name}을(를) 가지고 있는 ${args.name}을(를) 만났다! \n(당신의 무기: ${save[0].name}, ${save[0].value}강화)`);
        }

        await wait(5000);

        const random = Math.random() * 5 + 5

        for (var i = 0; random; ++i){
            await wait(1000);
            if (monster.hp <= 0){
                break
            }
            if (user.hp <= 0){
                break
            }
            // if (i >= random){
            //     interaction.editReply(`오히려 당신이 사냥당했다..`);
            //     clear()
            //     return
            // }
            if (Math.random() * 100 < 10){
                interaction.editReply(`당신은 ${monster.name}을(를) 공격합니다. {크리티컬!} ${damage * 2}대미지! (${monster.hp - damage * 2}HP)`);
                monster.hp -= damage * 2;
            }else if (Math.random() * 100 < 3){
                interaction.editReply(`당신의 공격이 빗나갔다! 0대미지. (${monster.hp}HP)`);
                monster.hp -= 0;
            }else if (Math.random() * 100 < 1){
                interaction.editReply(`{회심의 일격!} 당신은 ${monster.name}을(를) 공격합니다. {회심의 일격!} ${damage * 10}대미지! (${monster.hp - damage * 10}HP)`);
                monster.hp -= damage * 10;
            }else{
                interaction.editReply(`당신은 ${monster.name}을(를) 공격합니다. ${damage}대미지! (${monster.hp - damage}HP)`);
                monster.hp -= damage;
            }
            await wait(1000);
            if (Math.random() * 100 < 10){
                interaction.editReply(`상대는 ${user.name}을(를) 공격합니다. {크리티컬!} ${damage * 2}대미지! (${user.hp - damage * 2}HP)`);
                user.hp -= damage * 2;
            }else if (Math.random() * 100 < 3){
                interaction.editReply(`상대의 공격이 빗나갔다! 0대미지. (${user.hp}HP)`);
                user.hp -= 0;
            }else if (Math.random() * 100 < 1){
                interaction.editReply(`__**{회심의 일격!}**__ 상대는 ${user.name}을(를) 공격합니다. ${damage * 10}대미지! (${user.hp - damage * 10}HP)`);
                user.hp -= damage * 10;
            }else{
                interaction.editReply(`상대는 ${user.name}을(를) 공격합니다. ${damage}대미지! (${user.hp - damage}HP)`);
                user.hp -= damage;
            }
        }

        if (monster.hp <= 0){
            await wait(1000);

            await gambling_Schema.updateOne(
                {userid: interaction.user.id},
                {money: gambling_find.money + monster.reward, cooltime: gambling_find.cooltime},
                {upsert:true}
            );

            await level_Sechma.updateOne(
                {userid: interaction.user.id},
                {level: level_find.level + monster.XPreward, exp: 0},
                {upsert:true}
            );

            await gambling_Schema.updateOne(
                {userid: args.id},
                {money: gambling_find3.money - monster.reward, cooltime: gambling_find3.cooltime},
                {upsert:true}
            );

            await level_Sechma.updateOne(
                {userid: args.id},
                {level: level_find3.level - monster.XPreward, exp: 0},
                {upsert:true}
            );

            const embed = new EmbedBuilder()
                .setTitle("PVP 성공")
                .setDescription(
                    `${monster.name}을(를) 쓰러뜨렸습니다! 보상으로 ${monster.reward.toLocaleString()}돈, ${monster.XPreward.toLocaleString()}레벨 을 얻었습니다.`
                )
                .setColor("Green");
            
            interaction.channel.send({embeds: [embed]});
        }else if(user.hp <= 0){
            await wait(1000);

            await gambling_Schema.updateOne(
                {userid: args.id},
                {money: gambling_find3.money + user.reward, cooltime: gambling_find3.cooltime},
                {upsert:true}
            );

            await level_Sechma.updateOne(
                {userid: args.id},
                {level: (level_find3?.level || 1) + user.XPreward, exp: 0},
                {upsert:true}
            );

            await gambling_Schema.updateOne(
                {userid: interaction.user.id},
                {money: gambling_find.money - user.reward, cooltime: gambling_find.cooltime},
                {upsert:true}
            );

            await level_Sechma.updateOne(
                {userid: interaction.user.id},
                {level: (level_find?.level || 1) - user.XPreward, exp: 0},
                {upsert:true}
            );

            const embed = new EmbedBuilder()
                .setTitle("PVP 실패")
                .setDescription(
                    `당신이 졌습니다.. ${user.reward.toLocaleString()}돈, ${monster.XPreward.toLocaleString()}레벨을 잃었습니다...`
                )
                .setColor("DarkRed");
            
            interaction.channel.send({embeds: [embed]});
        }

        clear()

        function clear(){
            for(var i = 0; i < cooldown.length; i++){ 
                if (cooldown[i] === interaction.user.id) { 
                    cooldown.splice(i, 1); 
                    i--; 
                }
            } 
        }
    },
  };