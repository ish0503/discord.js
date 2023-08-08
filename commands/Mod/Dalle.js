const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const ket111 = "sk-BVR382wIeuX9vA6uFShUT3"
const ket222 = "BlbkFJlbUrFogBcHyz8BarKwew"
const configuration = new Configuration
  ({ apiKey: ket111 + ket222 });

var cooldown = false
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
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),

   // @param {import("discord.js").ChatInputCommandInteraction} interaction
  async execute(interaction) {
    if (cooldown) return
    const reason_option = interaction.options.getString("메시지");

    try {
      cooldown = true
      interaction.reply(reason_option + "을(를) 그리는중입니다..")
      //interaction.channel.startTyping();
      console.log(reason_option)
        //const { prompt } = req.body;

      // Generate image from prompt
      try {
        const response = await openai.createImage({
        prompt: reason_option,
        n: 1,
        size: "1024x1024",
      });
      interaction.channel.send(response.data.data[0].url);
      }catch (error) {
        content: `**부적절한 단어가 포함되있습니다.**`,
      }
      // Send back image url
      cooldown = false
    } catch (error) {
      //cooldown = false
      return interaction.reply({
        content: `**메시지전송에 실패했습니다**`,
      });
    }
  },
};
