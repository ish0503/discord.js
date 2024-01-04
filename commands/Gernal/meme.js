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
          { name: "윙크", value: "wink" },
        )
      )
                     .addIntegerOption(options => options
                       .setName("개수")
                .setDescription("뽑아낼(?) 개수를 입력.")
                .setMinValue(1)
             .setMaxValue(5)    .setRequired(false)
              ),
  /**
   *
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    interaction.reply("가져오는중");
    const category = interaction.options.getString("종류");
const count = interaction.options.getInteger("개수") || 1;

    for (var I= 1; I <= count; I++){
        let get_meme;

    try {
      get_meme = (await axios.get(`https://api.waifu.pics/sfw/${category}`))
        .data;
    } catch (error) {
      get_meme = {
        url: `https://www.google.com/url?sa=i&url=https%3A%2F%2Fnamu.wiki%2Fw%2F%25EC%2582%25AC%25EC%25A7%2584&psig=AOvVaw0cE0KoSRrZ1KE0reDdeeus&ust=1702874043505000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLjCiYvSlYMDFQAAAAAdAAAAABAE`,
      };
    }

    const embed = new EmbedBuilder()
      .setTitle("랜덤 짤")
      .setColor("Random")
      .setImage(get_meme.url)
      .setFooter({ text: "powered by waifu.pics" });

    interaction.channel.send({ content: "BOOM!", embeds: [embed] });
  }
    }
  
};
