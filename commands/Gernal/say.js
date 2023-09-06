const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("Say")
    .setDescription("말합니다")
    .addStringOption(options => options
        .setName("말")
        .setDescription("말을 입력해주세요.")
        .setRequired(true)
    ),
    async execute(interaction) {
      const args = interaction.options.getString("말")

        interaction.reply("args")
        }).catch(e => {
            return interaction.channel.send(`오류가 발생했습니다 ${e}`)
        })
    }
}
