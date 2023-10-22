const raid_Sechma = require("../models/raidparty")

const { } = require("discord.js")

module.exports = {
    data:{
        name: "참가",
    },
        /**
     *
     * @param {import("discord.js").Interaction} interaction
     */
    async execute(interaction) {
        const raid = await raid_Sechma.findOne({
            "hashtags.channelid": interaction.channel.id
        })

        if (!raid){
            interaction.reply({
                content: `레이드를 찾지 못함.`,
                ephemeral: true
            });
            return;
        }

        var list = []

        console.log(interaction.user.id)
        console.log(raid)
        console.log(raid.hashtags)
        var isitem = -1
        for (let i = 0; i < raid.hashtags.length; i++){
            list.push(raid.hashtags[i])
            if (raid.hashtags[i].channelid == interaction.channel.id) {
                isitem = i
            }
        }

        if (!list[isitem].userid == interaction.user.id){
            console.log(list[isitem])

            list[isitem].userid.push(interaction.user.id)
        }
        // if (participate.find(interaction.user.id)) {
        //     interaction.reply({content: '이미 레이드에 참가해있거나 쿨타임 시간입니다.', ephemeral: true}) 
        //     return;
        // }
        // participate.push(interaction.user.id)
        const thread2 = interaction.channel.threads.cache.find(x => x.name === '레이드');
        await thread2.members.add(interaction.user.id);
        interaction.reply({
            content: '성공적으로 참가되었습니다.',
            ephemeral: true
        })
    }
}
