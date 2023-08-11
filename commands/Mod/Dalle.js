const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration
  ({ apiKey: process.env.CHATGPTKEY });

const openai = new OpenAIApi(configuration);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("draw")
    .setDescription("Dall-e를 부려먹어봐요")
    .addStringOption((f) =>
      f
        .setName("메시지")
        .setRequired(true)
        .setDescription("메시지를 입력해 주세요 (영어 입력)")
        .setMaxLength(1000)
      )
    .addNumberOption((f) =>
      f
        .setName("반복횟수")
        .setRequired(false)
        .setDescription("이미지 생성 횟수")
        .setMinValue(1)
        .setMaxValue(4)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),

   // @param {import("discord.js").ChatInputCommandInteraction} interaction
  async execute(interaction) {
    await interaction.deferReply(); //{ephemeral: true}
    const reason_option = interaction.options.getString("메시지");
    const reason_option2 = interaction.options.getNumber("반복횟수");

    try {
     const response = await openai.createImage({
        prompt: reason_option,
        n: reason_option2 || 1,
        size: "1024x1024",
      });

      console.log(1)

      // const embed = new EmbedBuilder()
      // .addFields(
      //         { name: "Dalle 1", value: `**${response.data.data[0].url}**`, inline: true },
      // )
      // .setTitle(reason_option) 
      // .setColor("Blue")
      //.setDescription(res["data"]["choices"][0]["text"])
      for (var i=0; response.data.data[i]; i++) {
        if (i == 0) {
      await interaction.editReply(response.data.data[i].url);
      } else {
          await interaction.channel.send(response.data.data[i].url);
      }
      }
      
    } catch (error) {
      console.log(error.response)
      return await interaction.editReply({content: `오류 발생 **${error.response.status}**, **${error.response.statusText} 이같은 오류가 계속 발생한다면, 문의 넣어주세요.**`, ephemeral: true})
    }
  },
};
