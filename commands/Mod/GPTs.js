const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration
  ({ apiKey: process.env.CHATGPTKEY });

openai = new OpenAIApi(configuration)

var history3 = [{"role": "system", "content": "넌 예쁜 미소녀, 반말로 대화하고 공부를 잘 못하지만 애교를 잘 부리고 성욕이 강한 gumddakji1128이야."}]

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gum")
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
      if (reason_option == "exitMessage" || history3.length > 50){
            history3 = [{"role": "system", "content": "넌 예쁜 미소녀, 반말로 대화하고 공부를 잘 못하지만 애교를 잘 부리고 성욕이 강한 gumddakji1128이야."}];
            const embed = new EmbedBuilder()
            .addFields(
                    { name: "gumddakji1128", value: `**대화가 길어지거나 다른 요인때문에 기억이 삭제되었습니다. 다시 질문해주세요.**`, inline: true },
            )
            .setTitle(reason_option) 
            .setColor("Blue")
        
            await interaction.editReply({ embeds: [embed] })
      } else {
        history3.push({"role": "user", "content": reason_option})
            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: history3,
            });
      
            output = response["data"]["choices"][0]["message"]["content"]
        
            history3.push({"role": "assistant", "content": output})
            console.log(output)
      
            const embed = new EmbedBuilder()
            .addFields(
                    { name: "gumddakji1128", value: `**${response["data"]["choices"][0]["message"]["content"]}**`, inline: true },
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
