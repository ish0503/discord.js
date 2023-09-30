const { SlashCommandBuilder , EmbedBuilder } = require('discord.js');
const 도박_Schema = require("../../models/출석체크")
const gambling_Schema = require("../../models/Money")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("출석")
        .setDescription("오늘 출첵을 합니다."),
    /**
     * 
     * @param {import("discord.js").CommandInteraction} interaction
     * @returns
     * 
     */
    async execute(interaction, client) {
        let newData
        const gambling_find = await gambling_Schema.findOne({
            userid:interaction.user.id
        })
        const t = new Date()
        const user = await 도박_Schema.findOne({ userid: interaction.user.id })
        const date = "" + t.getFullYear() + (t.getMonth() + 1) + t.getDate()
                if (!user) {
                    await 도박_Schema.updateOne({   
                        count: 1, 
                        userid: interaction.member.user.id, 
                        date: date 
                    })
                    await gambling_Schema.updateOne(
                        {userid: interaction.user.id},
                        {money: (gambling_find?.money || 0) + 10000, cooltime: gambling_find?.cooltime || 0},
                        {upsert:true}
                    );
                    const embeds = new EmbedBuilder()
                    .setTitle("출석체크를 완료했어요.")
                    .setDescription(`1번째 <@${interaction.member.user.id}> 출석체크 완료! (+ ${random} 재화)`)      
                    .setColor(`#113131`)
                    .setTimestamp()
                    .setFooter(`${interaction.member.user.tag}`, interaction.member.user.displayAvatarURL()) 
                    interaction.editReply({embeds: [embeds]})
                } else {
                    const random = Math.round(Math.random() * (100 * user.count || 0)) + 10000
                    const embedss = new EmbedBuilder()
                    .setTitle("출석 체크 이미 완료. 내일 또 와요 !")
                    .setDescription(`<@${interaction.member.user.id}>님은 이미 출석을 한 상태입니다.`)
                    .setColor(`#2424242`)
                    .setTimestamp()
                    .setFooter(`${interaction.member.user.tag}`, interaction.member.user.displayAvatarURL()) 
                    if (user.date == date) return interaction.editReply({embeds: [embedss]})
                    await Schema.findOneAndRemove({ userid: interaction.user.id })
                    await 도박_Schema.updateOne({ 
                        count: parseInt(user.count) + 1, 
                        userid: interaction.member.user.id, 
                        date: date 
                    })
                    await gambling_Schema.updateOne(
                        {userid: interaction.user.id},
                        {money: (gambling_find?.money || 0) + random, cooltime: gambling_find?.cooltime || 0},
                        {upsert:true}
                    );
                    const embedsss = new EmbedBuilder()
                    .setTitle("출석체크를 완료했어요.")
                    .setDescription(`${parseInt(user.count) + 1}번째 <@${interaction.member.user.id}> 출석체크 완료! (+ ${random} 재화)`)
                    .setColor(`#242422`)
                    .setTimestamp()
                    .setFooter(`${interaction.member.user.tag}`, interaction.member.user.displayAvatarURL()) 
                    interaction.editReply({embeds: [embedsss]})
                }
        }
    }
