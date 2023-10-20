const {
    SlashCommandBuilder,
    EmbedBuilder
  } = require("discord.js");
  const gambling_Schema = require("../../models/Money")
  const gambling_Schema2 = require("../../models/upgrade")
  const comma = require("comma-number")
  const wait = require('node:timers/promises').setTimeout;
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("사냥")
      .setDescription("몹을 사냥해 전리품을 얻어보세요."),
    /**
     *
     * @param {import("discord.js").ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply()

        const gambling_find = await gambling_Schema.findOne({
            userid:interaction.user.id
        })

        if (!gambling_find){
            interaction.editReply({
                content: `**돈이 없으시군요.. \`/돈\` 명령어로 새냥신의 은총을 받으세요.**`
            })
            return
        }

        const monsters = [
            { name: '봇', hp: 1000, reward: 100000 },
            { name: '드래곤', hp: 500, reward: 50000 },
            { name: '전설의 용사', hp: 200, reward: 10000 },
            { name: '새뉴비', hp: 100, reward: 5000 },
            { name: '껌', hp: 50, reward: 2500 },
            { name: 'ks', hp: 10, reward: 500 },
            { name: '풀', hp: 5, reward: 0 },
        ];

        const gambling_find2 = await gambling_Schema2
            .find()
            .sort([["value"]])
            .limit(10)
            .exec();

        let save = []

        for (let i = 0; i < Object.keys(gambling_find2).length; i++){
            if (gambling_find2[i].userid == interaction.user.id){
                let json3  = JSON.parse(JSON.stringify(gambling_find2[i].hashtags));
                for (let v = 0; v < Object.keys(json3).length; v++){
                        if (json3[v]){
                            json3[v]["userid"] = gambling_find2[i].userid
                        }else if(json3){
                            json3["userid"] = gambling_find2[i].userid
                        }
                }
                save.push(...json3)
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
         console.log(save)

        var damage

        if (save.length <= 0){
            damage = 1
        }else{
            damage = save[0].value
        }
          
        const monster = getRandomMonster();
        interaction.editReply(`야생의 ${monster.name}을(를) 만났다! (당신의 무기: ${save[0].name}, ${save[0].value}강화)`);

        await wait(5000);

        for (var i = 0; 10; ++i){
            await wait(1000);
            if (Math.random() * 100 < 10){
                interaction.editReply(`당신은 ${monster.name}을(를) 공격합니다. {크리티컬!} ${damage * 2}대미지! (${monster.hp - damage * 2}HP)`);
                monster.hp -= damage * 2;
            }else{
                interaction.editReply(`당신은 ${monster.name}을(를) 공격합니다. ${damage}대미지! (${monster.hp - damage}HP)`);
                monster.hp -= damage;
            }
            if (i >= 10){
                interaction.editReply(`오히려 당신이 사냥당했다..`);
                return
            }
            if (monster.hp <= 0){
                break
            }
        }

        await wait(1000);

        gambling_Schema.updateOne(
            {userid: interaction.user.id},
            {money: Number(gambling_find?.money || 0) + monster.reward, cooltime: gambling_find.cooltime},
            {upsert:true}
        );

        const embed = new EmbedBuilder()
            .setTitle("사냥 성공")
            .setDescription(
                `${monster.name}을(를) 쓰러뜨렸습니다! 보상으로 ${monster.reward.toLocaleString()} 돈을 얻었습니다.`
            )
            .setColor("Green");
        
        interaction.channel.send({embeds: [embed]});
          
        function getRandomMonster() {
            return monsters[Math.floor(Math.random() * monsters.length)];
        }
    },
  };