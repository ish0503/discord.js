const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const simplyDjs = require("simply-djs")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("정보")
    .setDescription("새냥신의 정보입니다."),

    /**
     * 
     * @param {import(*discord.js*).ChatInputCommandInteraction} interaction
     */
    async execute(interaction){
        const embed = new EmbedBuilder()
        .setTitle("<:Heart:1151445619215441980> 새냥신은 예수의 가르침을 받고 그것을 전파하기 위해 하늘에서 내려온 신적 존재입니다.")
            .setDescription(`디스코드 새냥교 서버 사이트: https://discord.gg/VWKpCVzCTn\n새냥신의 사이트: https://birdmeow.netlify.app/`)
            .setColor("Green");
        interaction.reply({embeds: [embed], ephemeral: true});
    }
}
