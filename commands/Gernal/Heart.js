const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const heart_Schema = require("../../models/heart");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("호감도")
    .setDescription("호감도를 확인합니다 새늅봇과 호감도를 쌓으면 좋은일이 일어날지도..?")
    .addUserOption((f) =>
      f.setName("유저").setDescription("유저를 선택해주세요").setRequired(false)
    ),
  /**
   *
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const user = interaction.options.getUser("유저") || interaction.user;

    const heart_Find = await heart_Schema.findOne({ userid: user.id });

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setDescription(
        `**${user}님의 호감도는 ${heart_Find?.heart || 0} ❤️ 입니다**`
      );

    interaction.reply({ embeds: [embed] });
  },
};
