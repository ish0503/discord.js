const { ChannelType } = require("discord.js");
const client = require("../index");

const money_Schema = require("../models/Money")
const gambling_Schema = require("../models/upgrade")

module.exports = {
  name: "interactionCreate",
  once: false,
  /**
   *
   * @param {import("discord.js").Interaction} interaction
   */
  async execute(interaction) {
    if (!interaction.isContextMenuCommand()) return;
    if (interaction.isChatInputCommand()) { // Checks if the interaction is a command and runs the `
      const command = client.commands.get(interaction.commandName);
      if(!command) return;

      try{
          await command.execute(interaction);
      }catch(error){
          console.error(error);
          await interaction.reply({content : "There was an error while executing action"})
      }

      console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
      return;

  } else if (interaction.isButton()) { // Checks if the interaction is a button
      console.log(interaction);

      if (interaction.customId.substring(0,5) === '방어권구매') { // Check for the customId of the button
        const money_find = await money_Schema.findOne({
          userid:interaction.user.id
        })
        const gambling_find = await gambling_Schema.findOne({
          userid:interaction.user.id
        })
        const args = Number(interaction.customId.substring(5))
        if (!money_find || money_find.money < args * 100000){
          const embed = new EmbedBuilder()
            .setDescription(
                `**돈이 부족합니다**`
            )
            .setColor("Red");
        
            interaction.reply({embeds: [embed], ephemeral: true});
            return;
      }

      await money_Schema.updateOne(
        {userid:interaction.user.id},
        {money:Number(money_find.money) - args * 100000}
      )

      await gambling_Schema.updateOne(
        {userid: interaction.user.id},
        {
           hashtags : gambling_find.hashtags,
        cooltime: gambling_find.cooltime, defense: gambling_find?.defense + args},
        {upsert:true}
      );

        return interaction.update({
          content: '성공적으로 구매되었습니다.',
          ephemeral: true
        })
      }else if (interaction.customId === '방어권구매취소'){
        return interaction.update({
          content: '방어권 구매가 취소되었습니다.',
          ephemeral: true
        })
        // console.log(`${interaction.user.tag} in #${interaction.channel.name} clicked the offense button.`);
      
        //   const ActionRow = new MessageActionRow().setComponents(new MessageButton() // Create the button inside of an action Row
        //     .setCustomId('CustomId')
        //     .setLabel('방어권 구매가 취소되었습니다.')
        //     .setStyle('PRIMARY'));
      
        //   return interaction.update({ // update the interaction with the new action row
        //     content: '방어권 구매가 취소되었습니다.',
        //     components: [ActionRow],
        //     ephemeral: true
        //   });
      }
  }
  },
};