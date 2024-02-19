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

      const list = client.guilds.cache.get("1150691194146394143");
      var members
      try{
        members = await list.members.fetch(interaction.user.id)
      }catch (err){
        await interaction.reply("명령어를 사용하려면 새늅봇 서버에 가입해주세요. https://discord.gg/tcea2Rezus")
        return;
      }
      await command.execute(interaction);
      return;

  }
  },
};
