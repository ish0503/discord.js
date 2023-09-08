const { SlashCommandBuilder } = require("discord.js");
const simplyDjs = require("simply-djs")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("틱택토")
    .setDescription("신과 함께 틱택토를.."),

    /**
     * 
     * @param {import(*discord.js*).ChatInputCommandInteraction} interaction
     */
    async execute(interaction){
        await simplyDjs.tictactoe(interaction, {
            strict: true, 
            hard: true,
            buttons: {
                X: { style: ButtonStyle.Danger },
                O: { style: ButtonStyle.Success },
                blank: { style: ButtonStyle.Secondary }
            },
        })
    }
}