const {
  SlashCommandBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");
const comma = require("comma-number");
const { table } = require("node:console");
const wait = require('node:timers/promises').setTimeout;

const raid_Sechma = require("../../models/raidparty")
const gambling_Schema = require("../../models/Money")
const gambling_Schema2 = require("../../models/upgrade")
const level_Sechma = require("../../models/level")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("레이드")
    .setDescription("레이드를 시작해 보스 몬스터에 도전하세요."),
  /**
   *
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
      await interaction.deferReply()
      var raid = await raid_Sechma.findOne({
        channelid: interaction.channel.id
      })
    if (raid){
      await interaction.editReply({
                     content: `이 채널에서 이미 레이드가 진행중입니다.`,
                 });
      return;
    }

    await raid_Sechma.updateOne(
      {channelid:interaction.channel.id},
      {userid: []},
      {upsert:true}
      );

      const confirm = new ButtonBuilder()
    .setCustomId(`참가`)
    .setLabel(`참가`)
    .setStyle(ButtonStyle.Primary);

      const row = new ActionRowBuilder()
          .addComponents(confirm);

      await interaction.editReply({
          content: `참가하시겠습니까?`,
          components: [row],
      });

      await wait(60000)

      interaction.channel.send("이제 시작합니다.")

      interaction.deleteReply()

      var monsters = [
        { name: '죽음', hp: 100000, reward: 10000000, XPreward:10 },
      ];

      const monster = getRandomMonster();

    var raid = await raid_Sechma.findOne({
      channelid: interaction.channel.id
    })

    let save = []

        for (var i=0; i < raid.userid.length; i++){
          const gambling_find2 = await gambling_Schema2.findOne({
            userid:raid.userid[i]
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
        }

        console.log(save)

        for (i=0;i>save.length;){
          var damage

        //for (var i=0;i > save.length;){
          if (save.length <= 0){
              damage = 1
          }else{
              damage = save[0].value
          }
        //}
          
        if (save.length <= 0){
            interaction.channel.send(`야생의 ${monster.name}을(를) 만났다! (당신의 무기: 맨주먹`);
        }else{
            interaction.channel.send(`야생의 ${monster.name}을(를) 만났다! (당신의 무기: ${save[0].name}, ${save[0].value}강화)`);
        }

        await wait(5000);

        const random = Math.random() * 5 + 5

        for (var i = 0; random; ++i){
            await wait(1000);
            if (monster.hp <= 0){
                break
            }
            if (i >= random){
                interaction.channel.send(`오히려 당신이 사냥당했다..`);
            }
            if (Math.random() * 100 < 10){
                interaction.channel.send(`당신은 ${monster.name}을(를) 공격합니다. {크리티컬!} ${damage * 2}대미지! (${monster.hp - damage * 2}HP)`);
                monster.hp -= damage * 2;
            }else if (Math.random() * 100 < 3){
                interaction.channel.send(`당신의 공격이 빗나갔다! 0대미지. (${monster.hp}HP)`);
                monster.hp -= 0;
            }else if (Math.random() * 100 < 1){
                interaction.channel.send(`{회심의 일격!} 당신은 ${monster.name}을(를) 공격합니다. {회심의 일격!} ${damage * 10}대미지! (${monster.hp - damage * 10}HP)`);
                monster.hp -= damage * 10;
            }else{
                interaction.channel.send(`당신은 ${monster.name}을(를) 공격합니다. ${damage}대미지! (${monster.hp - damage}HP)`);
                monster.hp -= damage;
            }
        }
        }

        await wait(1000)

        if (monster.hp <= 0){
          for (var i=0; i < raid.userid.length; i++){
            const gambling_find = await gambling_Schema.findOne({
              userid:raid.userid[i]
            })
    
            const level_find = await level_Sechma.findOne({
                userid:raid.userid[i]
            })
            await gambling_Schema.updateOne(
              {userid: raid.userid[i]},
              {money: gambling_find.money + monster.reward, cooltime: gambling_find.cooltime},
              {upsert:true}
            ); 
            await level_Sechma.updateOne(
              {userid: raid.userid[i]},
              {level: (level_find?.level || 1) + monster.XPreward, exp: 0},
              {upsert:true}
          );
          }

        const embed = new EmbedBuilder()
            .setTitle("사냥 성공")
            .setDescription(
                `${monster.name}을(를) 쓰러뜨렸습니다! 보상으로 ${monster.reward.toLocaleString()}돈, ${monster.XPreward.toLocaleString()}레벨 을 얻었습니다.`
            )
            .setColor("Green");
        
        interaction.channel.send({embeds: [embed]});
        }
          
        function getRandomMonster() {
            return monsters[Math.floor(Math.random() * monsters.length)];
        }

  },
};