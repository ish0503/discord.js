const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const ket111 = "sk-BVR382wIeuX9vA6uFShUT3"
const ket222 = "BlbkFJlbUrFogBcHyz8BarKwew"
const configuration = new Configuration
  ({ apiKey: ket111 + ket222 });

openai = new OpenAIApi(configuration)

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chat")
    .setDescription("챗 봇과 채팅해봐요")
    .addStringOption((f) =>
      f
        .setName("메시지")
        .setRequired(true)
        .setDescription("메시지를 입력해 주세요")
        //.setMaxLength(1000)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),

  // @param {import("discord.js").ChatInputCommandInteraction} interaction
  async execute(interaction) {
    await interaction.deferReply(); //{ephemeral: true}
    const reason_option = interaction.options.getString("메시지");

    try {
      const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: reason_option }],
      });
      const res = await openai.createCompletion({
          model: "text-davinci-003",
          max_tokens: 2048,
          temperature: 0.5,
          prompt: reason_option
      })

      console.log(res["data"]["choices"][0]["text"])
      console.log(response["data"]["choices"][0]["message"]["content"])

      const embed = new EmbedBuilder()
      .addFields(
              { name: "text-davinci-003", value: `${res["data"]["choices"][0]["text"]}`, inline: true },
              { name: "gpt-3.5-turbo", value: `${response["data"]["choices"][0]["message"]["content"]}`, inline: true },
      )
      .setTitle(reason_option) 
      .setColor("Blue")
      //.setDescription(res["data"]["choices"][0]["text"])

      await interaction.editReply({ embeds: [embed] });
      
    } catch (error) {
      console.log(error.response)
      return await interaction.editReply({content: `오류 발생 **${error.response.status}**`, ephemeral: true})
    }
  },
};
