const { Configuration, OpenAIApi } = require('openai');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')

const configuration = new Configuration({
  apiKey: process.env.CHATGPTKEY,
});

const openai = new OpenAIApi(configuration);

module.exports = {
    data: new SlashCommandBuilder()
    .setName("gpt")
    .setDescription("ai와 대화하세요")
    .addStringOption(options => options
        .setName("검색어")
        .setDescription("검색어를 입력해주세요.")
        .setRequired(true)
    ),
    async execute(interaction) {
      try {
      const args = interaction.options.getString("검색어")

        //await interaction.deferReply();

        const result = await openai
        .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: args,
        // max_tokens: 256, // limit token usage
      })
      console.log(result.data.choices[0].message)
      interaction.reply(result.data.choices[0].message);
      }  catch (error) {
      console.log(`ERR: ${error}`);
         interaction.reply(`ERR: ${error}`);
      }
    }
}
