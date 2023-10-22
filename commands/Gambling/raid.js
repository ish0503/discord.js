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
      const raid = await raid_Sechma.findOne({
        "hashtags.channelid": interaction.channel.id
      })
    if (raid){
      await interaction.editReply({
                     content: `이 채널에서 이미 레이드가 진행중입니다.`,
                 });
      return;
    }

    var list = []
    var isitem = -1
    for (let i = 0; i < raid.hashtags.length; i++){
        list.push(raid.hashtags[i])
     }

     list.push({"channelid": interaction.channel.id, "userid":[]})

     await raid_Sechma.updateOne(
      {$set: {
         hashtags : list,
      },
      },
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
      

  },
};