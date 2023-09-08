const { ChannelType } = require("discord.js");
const client = require("../index");
const heart_Sechma = require("../models/heart")

module.exports = {
  name: "interactionCreate",
  once: false,
  /**
   *
   * @param {import("discord.js").Interaction} interaction
   */
  async execute(interaction) {
    if (!interaction.isChatInputCommand() && !interaction.isContextMenuCommand()) return;
    if (interaction.channel.type == ChannelType.DM) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
      await command.execute(interaction);

      await heart_Sechma.updateOne(
        {userid:interaction.user.id}, 
        {$inc:{heart:1}}, 
        {upsert:true}
      )
    } catch (error) {
      console.log(error);
    }
  },
};
