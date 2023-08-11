const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
var bot = new require("discord.js").Client();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("randomplayer")
    .setDescription("서버에 있는 아무 플레이어나 핑합니다.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  // @param {import("discord.js").ChatInputCommandInteraction} interaction
  async execute(interaction) {
    await interaction.deferReply(); //{ephemeral: true}

    try {

      for (let i = 0; i < guilds.length; i++) {
    bot.guilds.get(guilds[i].id).fetchMembers().then(r => {
      r.members.array().forEach(r => {
        let username = `${r.user.username}#${r.user.discriminator}`;
        console.log(`${username}`);
      });
    });
      }

      await interaction.editReply({ embeds: [embed] });
      
    } catch (error) {
      console.log(error.response)
      return await interaction.editReply({content: `오류 발생 **${error.response.status}**, **${error.response.statusText} 이같은 오류가 계속 발생한다면, 문의 넣어주세요.**`, ephemeral: true})
    }
  },
};
