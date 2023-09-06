const { Configuration, OpenAIApi } = require('openai');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')

const configuration = new Configuration({
  apiKey: process.env.CHATGPTKEY,
});

const openai = new OpenAIApi(configuration);

const setting = {role: 'system', content: '너는 예수님의 가르침을 받은 새늅과 마냥신이야.'}

module.exports = {
    data: new SlashCommandBuilder()
    .setName("gpt")
    .setDescription("ai와 대화하세요")
    .addStringOption(options => options
        .setName("말할것")
        .setDescription("말할것 입력해주세요.")
        .setRequired(true)
    ),
    async execute(interaction) {
	    interaction.reply("잠시 시간이 소요됩니다..")
      try {
        console.log("aaa")
      const args = interaction.options.getString("말할것")
        console.log(args)

        //await interaction.deferReply();

        const result = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
          messages: [
	  {
	    role: "user",
	    content: setting + {role: 'user', content: args},
	  }],
        // max_tokens: 256, // limit token usage
      })
      console.log(result.data.choices[0].message)
      interaction.channel.send(result.data.choices[0].message.content);
      }  catch (error) {
      console.log(`ERR: ${error}`);
         interaction.channel.send(`ERR: ${error}`);
      }
    }
}
