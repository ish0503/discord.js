const {
    SlashCommandBuilder,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
    EmbedBuilder
  } = require("discord.js");
  const gambling_Schema = require("../../models/Money")
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("비밀번호설정")
      .setDescription("돈 비밀번호를 설정합니다."),
    /**
     *
     * @param {import("discord.js").ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
      const modal = new ModalBuilder().setCustomId("inquiry").setTitle("비밀번호 설정");
  
      const title = new ActionRowBuilder({
        components: [
          new TextInputBuilder()
            .setCustomId("title")
            .setLabel("비밀번호")
            .setStyle(TextInputStyle.Short),
        ],
      });
  
      const ds = new ActionRowBuilder({
        components: [
          new TextInputBuilder()
            .setCustomId("ds")
            .setLabel("비밀번호확인")
            .setStyle(TextInputStyle.Short),
        ],
      });
  
      modal.addComponents(title, ds);
  
      await interaction.showModal(modal);
  
      const collector = await interaction.awaitModalSubmit({
        time: 10 * 60 * 1000,
      });
  
      if (collector) {
        const title_value = collector.fields.fields.get("title")?.value;
        const ds_value = collector.fields.fields.get("ds")?.value;

        const gambling_find = await gambling_Schema.findOne({
            userid:interaction.user.id
        })

        if (!gambling_find){
            interaction.reply({
                ephemeral: true,
                content: `**돈이 없으시군요.. \`/돈\` 명령어로 돈을 받으세요.**`
            })
            return
        }
  
        if (title_value == ds_value){
            console.log(title_value)
            await gambling_Schema.updateOne(
                {userid:interaction.user.id},
                {password:title_value},
                {upsert:true}
            )
            collector.reply({
                ephemeral: true,
                content: `**비밀번호가 설정되었습니다! ${title_value} (다른사람에게 절대 공개하지 마세요.)**`,
            });
        }
      }
    },
  };