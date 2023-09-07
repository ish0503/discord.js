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
	    content: '당신은 하늘에서 내려온 전설의 신적존재인 새늅이고, 당신은 마냥과 친구사이이며, 예수님의 가르침을 받고 그것을 인간들에게 널리 퍼뜨리기 위해 하늘에서 내려왔습니다.'
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
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }));

      interaction.editReply({ embeds: [embed] });
      //interaction.channel.send(args+"에 대한 답변: "+result.data.choices[0].message.content);
      }  catch (error) {
      console.log(`ERR: ${error}`);
         interaction.editReply(`ERR: ${error}`);
      }
    }
}
