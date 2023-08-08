const {
  SlashCommandBuilder,
  ChannelType,
  PermissionFlagsBits,
} = require("discord.js");
const joinLog_Schema = require("../../models/joinLog");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("입장로그")
    .setDescription("서버 입장로그를 설정합니다")
    .addChannelOption((f) =>
      f
        .setName("채널")
        .setDescription("입장로그가 전송될 채널을 선택해 주세요")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    )
    .addStringOption((f) =>
      f
        .setName("환영메시지")
        .setDescription("환영 메시지를 입력해 주세요")
        .setRequired(true)
        .setMinLength(10)
        .setMaxLength(4000)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const option_channel = interaction.options.getChannel("채널");
    const option_welcomeText = interaction.options.getString("환영메시지");

    await joinLog_Schema.updateOne(
      { guildId: interaction.guild.id },
      { channelId: option_channel.id, welcomeText: option_welcomeText },
      { upsert: true }
    );

    interaction.reply({
      content: `**입장로그가 ${option_channel}에 표시됩니다**`,
    });
  },
};
