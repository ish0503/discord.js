const { ChannelType } = require("discord.js");
const client = require("../index");

module.exports = {
  name: "interactionCreate",
  once: false,
  /**
   *
   * @param {import("discord.js").Interaction} interaction
   */
  async execute(interaction) {
    if (interaction.isButton()) { // Checks if the interaction is a button
        const button = client.buttons.get(interaction.customId)
        if (!button) return new Error("버튼 코드를 찾을수 없음")
  
        try{
          if (interaction.customId == '참가'){
            await button.execute(interaction);
          }else{
            await button.execute(interaction);
            //await thread.delete();
          }
        }catch(error){
            console.error(error);
            await interaction.reply({content : "There was an error while executing action"})
        }
        return;
    }
    if (!interaction.isChatInputCommand() && !interaction.isContextMenuCommand()) return;
    if (interaction.isCommand()) { // Checks if the interaction is a command and runs the `
      const command = client.commands.get(interaction.commandName);
      if(!command) return;
      try{
          await command.execute(interaction);
      }catch(error){
          console.error(error);
          await interaction.reply({content : "There was an error while executing action"})
      }
      return;

  }
  },
};
