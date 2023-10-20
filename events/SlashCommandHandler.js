const { ChannelType } = require("discord.js");
const client = require("../index");
const heart_Sechma = require("../models/level")

module.exports = {
  name: "interactionCreate",
  once: false,
  /**
   *
   * @param {import("discord.js").Interaction} interaction
   */
  async execute(interaction) {
    if (!interaction.isChatInputCommand() && !interaction.isContextMenuCommand()) return;
    //if (interaction.channel.type == ChannelType.DM) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    const gambling_find = await heart_Schema.findOne({
            userid:interaction.user.id
        })
    try {
      await command.execute(interaction);

      await heart_Sechma.updateOne(
        {userid:interaction.user.id}, 
        {level: gambling_find?.level || 1},
        {$inc:{exp:1}}, 
        {upsert:true}
      )
      const gambling_find = await heart_Sechma.findOne({
            userid:interaction.user.id
        })
      if (gambling_find.exp >= gambling_find.level * 500) {
        await heart_Sechma.updateOne(
        {userid:interaction.user.id}, 
        {exp:gambling_find.exp - gambling_find.level * 500},
        {$inc:{level:1}}, 
        {upsert:true}
      )
      }
      } catch (error) {
      console.log(error);
    }
  },
};
