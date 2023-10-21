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
    const thread = interaction.channel.threads.create({
      name: '레이드',
      autoArchiveDuration: 60,
      type: ChannelType.PrivateThread,
      reason: '레이드를 위한 스레드',
    });
    if (interaction.isButton()) { // Checks if the interaction is a button
        const button = client.buttons.get(interaction.customId)
        if (!button) return new Error("버튼 코드를 찾을수 없음")
  
        try{
          if (interaction.customId == '레이드'){
            await button.execute(interaction, thread);
          }else{
            await button.execute(interaction);
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