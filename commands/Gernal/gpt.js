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
        .setName("말할것")
        .setDescription("말할것 입력해주세요.")
        .setRequired(true)
    ),
    async execute(interaction) {
	await interaction.deferReply();
      try {
      const args = interaction.options.getString("말할것")
        //await interaction.deferReply();

        const result = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
          messages: [
          {
	    role: "system",
	    content: `I'm the god of legend, BirdNoob, who came down from heaven, I'm friends with Manyang, and I came down from heaven with Manyang to spread it to humans under the education of Jesus.`
	  },
	  {
	    role: "user",
	    content: args
	  }
	  ],
        // max_tokens: 256, // limit token usage
      })
	console.log(result.data.usage.total_tokens + "토큰 사용")
	const embed = new EmbedBuilder()
        .setTitle(`${args}에 대한 답변`)
        .setDescription(`**${result.data.choices[0].message.content}**`)
        .setFooter({ text: `유저 이름 : ${interaction.user.username}(${interaction.user.globalName}), ID: ${interaction.user.id}` })
        .setColor(0xFFFF00)
        //.setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
	.setImage('https://cdn.discordapp.com/avatars/989433815539777546/5da15b220fdc3e27072e4c4a9ffa4987.webp?size=512');

      interaction.editReply({ embeds: [embed] });
      //interaction.channel.send(args+"에 대한 답변: "+result.data.choices[0].message.content);
      }  catch (error) {
      console.log(`ERR: ${error}`);
         interaction.editReply(`ERR: ${error}`);
      }
    }
}
