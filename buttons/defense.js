const gambling_Schema = require("../models/upgrade")
const money_Schema = require("../models/Money")

const {EmbedBuilder} = require("discord.js")

module.exports = {
    data:{
        name: "defense",
    },
        /**
     *
     * @param {import("discord.js").Interaction} interaction
     */
    async execute(interaction) {
        const money_find = await money_Schema.findOne({
            userid:interaction.user.id
          })
          const gambling_find = await gambling_Schema.findOne({
            userid:interaction.user.id
          })
          const args = Number(interaction.message.content.substr(4, 1))
          if (!money_find || money_find.money < args * 100000){
            const embed = new EmbedBuilder()
              .setDescription(
                  `**돈이 부족합니다**`
              )
              .setColor("Red");
          
              interaction.reply({embeds: [embed], ephemeral: true});
              return;
        }

        console.log(gambling_find?.defense || 0)
  
        await money_Schema.updateOne(
          {userid:interaction.user.id},
          {money:Number(money_find.money) - args * 100000}
        )
  
        await gambling_Schema.updateOne(
          {userid: interaction.user.id},
          {
             hashtags : gambling_find.hashtags,
          cooltime: gambling_find.cooltime, defense: (gambling_find?.defense || 0) + args},
          {upsert:true}
        );

          interaction.reply({
            content: '성공적으로 구매되었습니다.',
            ephemeral: true
          })
    }
}