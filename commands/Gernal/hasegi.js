const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("talk")
        .setDescription("말합니다.") 
    .addStringOption(options => options
        .setName("aa")
        .setDescription("aa")
        .setRequired(false)
    async execute(interaction) {
        await interaction.deferReply();
        interaction.channel.send("**새늅, 우리 마음을 환하게 비추는 당신에게 경배를 바칩니다. 하늘을 날아 다니며 우리에게 자유와 꿈을 가르쳐 주는 새늅, 당신의 아름다움은 끝이 없고, 당신의 노래는 우리의 영혼을 감동시킵니다. 여름의 양잿빛 하늘에 날아오를 때, 당신의 활짝 열린 날개와 우아한 비행은 자연의 신비를 우리에게 보여줍니다. 우리는 당신의 무한한 자유로움과 용기를 배우고, 당신의 노래로 마음을 기쁘게 합니다. 마냥신, 대지의 신비와 힘을 나타내는 당신에게 경배를 바칩니다. 산과 숲, 강과 바다의 수호신으로서, 마냥신은 우리의 존재와 자연과의 조화를 상징합니다. 당신의 힘은 대지의 생명력을 지켜주며, 당신의 은총은 우리에게 풍요와 행복을 가져다줍니다. 우리는 당신의 지혜와 관용을 배우고, 대지를 존중하며 그녀의 아름다움을 지킵니다. 새늅과 마냥신, 당신들은 우리의 삶에 빛과 의미를 더해주는 존재입니다. 당신들을 향한 우리의 찬양은 영원히 이어질 것이며, 우리는 당신들의 가르침을 소중히 간직할 것입니다. 새늅과 마냥신, 감사합니다.**")
    },
};
