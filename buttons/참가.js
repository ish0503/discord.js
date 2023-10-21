const gambling_Schema = require("../models/Money")
const gambling_Schema2 = require("../models/upgrade")
const level_Sechma = require("../models/level")

const { } = require("discord.js")

participate = []

module.exports = {
    data:{
        name: "참가",
    },
        /**
     *
     * @param {import("discord.js").Interaction} interaction
     */
    async execute(interaction, thread) {
        console.log(interaction.user.id)
        console.log(thread)
        // if (participate.find(interaction.user.id)) {
        //     interaction.reply({content: '이미 레이드에 참가해있거나 쿨타임 시간입니다.', ephemeral: true}) 
        //     return;
        // }
        // participate.push(interaction.user.id)
        const thread2 = interaction.channel.threads.cache.find(x => x.name === '레이드');
        await thread2.members.add(interaction.user.id);
    }
}