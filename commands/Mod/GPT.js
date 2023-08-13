const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration
  ({ apiKey: process.env.CHATGPTKEY });

openai = new OpenAIApi(configuration)

var history = [{"role": "system", "content": "당신은 선택을 잘 못하고 결정을 잘 못내리지만 정확하고 확실한 정보를 가져오는 새늅입니다."}]

module.exports = {
  data: new SlashCommandBuilder()
    .setName("birdnoob")
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
      if (reason_option == "exitMessage" || history.length > 50){
            history = [{"role": "system", "content: 당신은 선택을 잘 못하고 결정을 잘 못내리지만 정확하고 확실한 정보를 가져오는 새늅입니다."}];
            const embed = new EmbedBuilder()
            .addFields(
                    { name: "birdnoob", value: `**대화가 길어지거나 다른 요인때문에 기억이 삭제되었습니다. 다시 질문해주세요.**`, inline: true },
            )
            .setTitle(reason_option) 
            .setColor("Blue")
        
            await interaction.editReply({ embeds: [embed] })
      } else {
        history.push({"role": "user", "content": reason_option})
            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: history,
            });
      
            output = response["data"]["choices"][0]["message"]["content"]
        
            history.push({"role": "assistant", "content": output})
            console.log(output)
      
            const embed = new EmbedBuilder()
            .addFields(
                    { name: "birdnoob", value: `**${response["data"]["choices"][0]["message"]["content"]}**`, inline: true },
            )
            .setTitle(reason_option) 
            .setColor("Blue")
      
            await interaction.editReply({ embeds: [embed] });
      }
    } catch (error) {
      console.log(error.response)
      return await interaction.editReply({content: `오류 발생 **${error.response.status}**, **${error.response.statusText} 이같은 오류가 계속 발생한다면, 문의 넣어주세요.**`, ephemeral: true})
    }
  },
};
