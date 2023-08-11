const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration
  ({ apiKey: process.env.CHATGPTKEY });

openai = new OpenAIApi(configuration)

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chat")
    .setDescription("챗 봇과 채팅해봐요")
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),

  // @param {import("discord.js").ChatInputCommandInteraction} interaction
  async execute(interaction) {
    await interaction.deferReply(); //{ephemeral: true}
    const reason_option = interaction.options.getString("메시지");

    try {
      const player = await ol

      const embed = new EmbedBuilder()
      .addFields(
              { name: "gpt-3.5-turbo", value: `**${response["data"]["choices"][0]["message"]["content"]}**`, inline: true },
              { name: "text-davinci-003", value: `${reason_option + res["data"]["choices"][0]["text"]}`, inline: true },
      )
      .setTitle(reason_option) 
      .setColor("Blue")
      //.setDescription(res["data"]["choices"][0]["text"])

      await interaction.editReply({ embeds: [embed] });
      
    } catch (error) {
      console.log(error.response)
      return await interaction.editReply({content: `오류 발생 **${error.response.status}**, **${error.response.statusText} 이같은 오류가 계속 발생한다면, 문의 넣어주세요.**`, ephemeral: true})
    }
  },
};
