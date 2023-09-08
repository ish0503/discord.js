const { SlashCommandBuilder } = require("discord.js");
const simplyDjs = require("simply-djs")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("계산기")
    .setDescription("신은 간단한 계산도 잘합니다."),

    /**
     * 
     * @param {import(*discord.js*).ChatInputCommandInteraction} interaction
     */
    async execute(interaction){
        await simplyDjs.calculator(interaction)
    }
}