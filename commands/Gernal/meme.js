const { default: axios } = require("axios");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("랜덤짤")
    .setDescription("랜덤 짤을 보여줍니다")
    .addStringOption((f) =>
      f
        .setName("종류")
        .setDescription("짤 종류를 선택해 주세요")
        .setRequired(true)
        .addChoices(
            { name: "wife", value: "waifu" },
            { name: "네코", value: "neko" },
            { name: "죽여", value: "kill" },
            { name: "키스", value: "kiss" },
            { name: "행복", value: "happy" },
            { name: "댄스", value: "dance" },
            { name: "허그", value: "hug" },
            { name: "쓰다듬기", value: "pat" },
            { name: "인사", value: "wave" },
            { name: "울음", value: "cry" },
            { name: "윙크", value: "wink" }
        )
    ),
  /**
   *
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    interaction.deferReply()
    const category = interaction.options.getString("종류");

    let get_meme

    try {
        get_meme=(await axios.get(`https://api.waifu.pics/sfw/${category}`)).data
    } catch (error) {}

    const embed = new EmbedBuilder()
    .setTitle("랜덤 짤")
    .setColor("Random")
    .setImage(get_meme.url)
    .setFooter({ text: "powered by waifu.pics" });

    interaction.editReply({ content: "BOOM!", embeds: [embed], ephemeral: true });
  },
};