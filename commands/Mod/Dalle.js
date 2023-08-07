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
        .setDescription("메시지를 입력해 주세요")
        .setMaxLength(1000)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),

   // @param {import("discord.js").ChatInputCommandInteraction} interaction
  async execute(interaction) {
    if (cooldown) return
    const reason_option = interaction.options.getString("메시지");

    try {
      cooldown = true
      interaction.reply("잠시만 기다려주세요..")
      //interaction.channel.startTyping();
      console.log(reason_option)
        //const { prompt } = req.body;

      // Generate image from prompt
      const response = await openai.createImage({
        prompt: reason_option,
        n: 1,
        size: "1024x1024",
      });
      // Send back image url
      interaction.channel.send(response.data.data[0].url);
      cooldown = false
    } catch (error) {
      //cooldown = false
      return interaction.reply({
        content: `**메시지전송에 실패했습니다**`,
      });
    }
  },
};
