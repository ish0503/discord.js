const { SlashCommandBuilder , EmbedBuilder } = require("discord.js")    

module.exports = {
    data: new SlashCommandBuilder()
        .setName("미니게임")
        .setDescription("미니게임을 시작합니다."),
    /**
     * 
     * @param {import("discord.js").CommandInteraction} interaction
     * @returns
     * 
     */
    async execute(interaction) {
        const embed = new EmbedBuilder()
        .setTitle('미니게임')
        .setDescription('미니게임을 시작합니다.')
        .setColor('2F3136')
        interaction.reply({embeds: [embed], ephemeral: true});
        var channel = `1148907220889780225`
        if (interaction.channel.id == channel) {
            function random(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }
            var num = random(1, 100)
            var count = 0
            
            const filter = m => m.author.id === interaction.user.id;
            const collector = interaction.channel.createMessageCollector({ filter, time: 60000 });
            collector.on('collect', m => {
                var number = parseInt(m.content)
                if (number > num) {
                    count = count + 1
                    interaction.followUp({content: `더 낮습니다.`, ephemeral: true});
                } else if (number < num) {
                    count = count + 1
                    interaction.followUp({content: `더 높습니다.`, ephemeral: true});
                }
                if (number == num) {
                    count = count + 1
                    interaction.followUp({content: `정답입니다! ${count}번 만에 맞추셨습니다!`, ephemeral: true});
                    collector.stop()
                }
            });
            collector.on('end', collected => {
                if (collected.size == 0) {
                    interaction.followUp({content: `시간이 초과되었습니다.`, ephemeral: true});
                }
            }
            );
        }
    }
};