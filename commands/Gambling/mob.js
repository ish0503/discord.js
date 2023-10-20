const {
    SlashCommandBuilder,
    EmbedBuilder
  } = require("discord.js");
  const gambling_Schema = require("../../models/Money")
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
        interaction.deferReply()
        const gambling_find = await gambling_Schema.findOne({
            userid:interaction.user.id
        })

        if (!gambling_find){
            interaction.reply({
                content: `**돈이 없으시군요.. \`/돈\` 명령어로 새냥신의 은총을 받으세요.**`
            })
            return
        }

        const monsters = [
            { name: '새뉴비', hp: 100, reward: 0 },
            { name: 'ks', hp: 1, reward: 0.1 },
        ];

        const damage = 1
          
        const monster = getRandomMonster();
        interaction.editReply(`야생의 ${monster.name}을(를) 만났다!`);

        while (monster.hp > 0) {
            await wait(1000);
            interaction.channel.send(`당신은 ${monster.name}을(를) 공격합니다. ${damage}대미지!`);
            monster.hp -= damage;
        }

        await wait(1000);

        gambling_Schema.updateOne(
            {userid: interaction.user.id},
            {money: Number(gambling_find?.money || 0) + monster.reward, cooltime: gambling_find.cooltime},
            {upsert:true}
        );
        
        interaction.channel.send(`${monster.name}을(를) 쓰러뜨렸습니다! 보상으로 ${monster.reward.toLocaleString()} 돈을 얻었습니다.`);
          
        function getRandomMonster() {
            return monsters[Math.floor(Math.random() * monsters.length)];
        }
    },
  };