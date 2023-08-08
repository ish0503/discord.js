const ytsearch = require('yt-search')
const comma = require('comma-number') 
const { EmbedBuilder } = require('discord.js') 
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("유튜브검색")
    .setDescription("디스코드에서 유튜브검색을 할수있어요!")
    .addStringOption(options => options
        .setName("검색내용")
        .setDescription("검색어를 입력해주세요.")
        .setRequired(true)
    ),
    async execute(interaction) {
        const args = interaction.options.getString("검색내용")
        const argsjoin = args
        if (!argsjoin) return interaction.reply("검색하실 내용을 입력해주세요") 
        let search = await ytsearch(argsjoin) 
        let video = search.videos[0] 
        if (!video) return interaction.reply("검색 결과가 없습니다.")

        const { views, title, timestamp, url, author, ago, image } = video
        const embed = new EmbedBuilder()
            .setTitle(`${argsjoin}에 대한 검색결과입니다`) 
            .setImage(image) 
            .addFields(
                { name: "제목", value: `${title}`, inline: true },
                { name: "링크", value: `[링크](${url})`, inline: true },
                { name: "채널주인", value: `[${author.name}](${author.url})`, inline: true },
                { name: "영상 생성일", value: `${ago}`, inline: true },
                { name: "영상길이", value: `${timestamp}`, inline: true },
                { name: "조회수", value: `${comma(views)}회`, inline: true }
            )
            .setColor(0x0099ff) 
            .setFooter(`${interaction.user.tag}`, interaction.user.displayAvatarURL()) 

        await interaction.reply({ embeds: [embed], content: " " }) 
    }
}
