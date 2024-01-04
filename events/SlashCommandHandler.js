const client = require("../index");

module.exports = {
  name: "interactionCreate",
  once: false,
  /**
   *
   * @param {import("discord.js").Interaction} interaction
   */
  async execute(interaction) {
    if (!interaction.isChatInputCommand() && !interaction.isContextMenuCommand()) return;
    if (interaction.isCommand()) { // Checks if the interaction is a command and runs the `
      const command = client.commands.get(interaction.commandName);
      if(!command) return;
     // try{
          await command.execute(interaction);
     // }catch(error){
        //  console.error(error);
       //   await interaction.reply({content : "There was an error while executing action"})
   //   }
      return;

  }
  },
};
