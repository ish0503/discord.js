const Schema = require("../../models/Money")
const { SlashCommandBuilder } = require('discord.js');
const comma = require("comma-number")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("바카라")
        .setDescription("해당 명령어로는 바카라를 플레이 할 수 있어요!")
        .addSubcommand(subcommand =>
          subcommand
            .setName("뱅커")
            .setDescription("뱅커 배팅 [ 배당 1.96배 ]")
            .addIntegerOption(f => 
              f.setName("배팅액")
              .setDescription("배팅하실 금액을 입력해 주세요")
              .setRequired(true)
              .setMinValue(1000))
        )
        .addSubcommand(subcommand =>
              subcommand
                .setName("플레이어")
                .setDescription("플레이어 배팅 [ 배당 1.96배 ]")
                .addIntegerOption(f => 
                  f.setName("배팅액")
                  .setDescription("배팅하실 금액을 입력해 주세요")
                  .setRequired(true)
                  .setMinValue(1000))
            )
        .addSubcommand(subcommand =>
              subcommand
                .setName("타이")
                .setDescription("타이 배팅 [ 배당 11배 ]")
                .addIntegerOption(f => 
                  f.setName("배팅액")
                  .setDescription("배팅하실 금액을 입력해 주세요")
                  .setRequired(true)
                  .setMinValue(1000))
            ),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === "뱅커") {
            const money = interaction.options.getInteger("배팅액")
            const ehqkrduqn = await Schema.findOne({ userid: interaction.user.id })
            if (!ehqkrduqn) return interaction.reply({
                embeds: [
                  new (require("discord.js")).EmbedBuilder()
                  .setTitle('SYSTEM API ERROR')
                  .setDescription(`등록 되지 않은 사용자입니다. [ /가입 ]`)
                  .setColor('#2F3136')
                ],
                ephemeral: true
              })
         if (money > ehqkrduqn.money) return interaction.reply({
            embeds: [
              new (require("discord.js")).EmbedBuilder()
              .setTitle('SYSTEM API ERROR')
              .setDescription(`소유하고 있는 머니보다 더 큰 금액을 배팅할 수 없습니다.`)
              .setColor('#2F3136')
            ],
            ephemeral: true
          })
          const user = interaction.user
          const wjdqh = await Schema.findOne({ userid: user.id })
          if (!wjdqh) return interaction.reply({
              embeds: [
                new (require("discord.js")).EmbedBuilder()
                .setTitle('SYSTEM API ERROR')
                .setDescription(`등록 되지 않은 사용자입니다.`)
                .setColor('#2F3136')
              ],
              ephemeral: true
            })
            const random = Math.floor(Math.random() * 21)

            if (random == 1 || random == 3 || random == 5 || random == 7 || random == 9 || random == 11 || random == 13 || random == 15 || random == 17 || random == 19){
                    var moneya = money * 1.96
                    await Schema.findOneAndUpdate({ userid: user.id }, {
                        money: ehqkrduqn.money + moneya,
                        userid: user.id,
                        date: ehqkrduqn.date
                    })
                    const f = ehqkrduqn.money + moneya
                    const embed = new (require("discord.js")).EmbedBuilder()
                    .setTitle(`바카라 적중 [ 배팅 : 뱅커 ]`)
                    .setDescription(`**\`\`\`ansi
[0;31m금액지급 완료 : [0;37m+${comma(moneya)}원\n[0;31m현재잔액 : [0;37m${comma(f)}원\`\`\`**`)
                    .setColor("#2F3136")
                    .setThumbnail(interaction.member.user.displayAvatarURL({ dynamic: true }))
                    .setFooter({text: `${random} 숫자가 떴습니다.`})
                    await interaction.reply({ embeds: [embed] })
            }else{
                await Schema.findOneAndUpdate({ userid: user.id }, {
                    money: ehqkrduqn.money - money,
                    userid: user.id,
                    date: ehqkrduqn.date
                })
                const f = ehqkrduqn.money - money
                const embed = new (require("discord.js")).EmbedBuilder()
                .setTitle(`바카라 미적중 [ 배팅 : 뱅커 ]`)
                .setDescription(`**\`\`\`ansi
[0;31m금액회수 완료 : [0;37m-${comma(money)}원\n[0;31m현재잔액 : [0;37m${comma(f)}원\`\`\`**`)
                .setColor("#2F3136")
                .setThumbnail(interaction.member.user.displayAvatarURL({ dynamic: true }))
                .setFooter({text: `${random} 숫자가 떴습니다.`})
                await interaction.reply({ embeds: [embed] })
            }
        }else if (interaction.options.getSubcommand() === "플레이어") {
            const money = interaction.options.getInteger("배팅액")
            const ehqkrduqn = await Schema.findOne({ userid: interaction.user.id })
            if (!ehqkrduqn) return interaction.reply({
                embeds: [
                  new (require("discord.js")).EmbedBuilder()
                  .setTitle('SYSTEM API ERROR')
                  .setDescription(`등록 되지 않은 사용자입니다. [ /가입 ]`)
                  .setColor('#2F3136')
                ],
                ephemeral: true
              })
         if (money > ehqkrduqn.money) return interaction.reply({
            embeds: [
              new (require("discord.js")).EmbedBuilder()
              .setTitle('SYSTEM API ERROR')
              .setDescription(`소유하고 있는 머니보다 더 큰 금액을 배팅할 수 없습니다.`)
              .setColor('#2F3136')
            ],
            ephemeral: true
          })
          const user = interaction.user
          const wjdqh = await Schema.findOne({ userid: user.id })
          if (!wjdqh) return interaction.reply({
              embeds: [
                new (require("discord.js")).EmbedBuilder()
                .setTitle('SYSTEM API ERROR')
                .setDescription(`등록 되지 않은 사용자입니다.`)
                .setColor('#2F3136')
              ],
              ephemeral: true
            })
            const random = Math.floor(Math.random() * 21)

            if (random == 2 || random == 4 || random == 6 || random == 8 || random == 10 || random == 12 || random == 14 || random == 16 || random == 18 || random == 20){
                    var moneya = money * 1.96
                    await Schema.findOneAndUpdate({ userid: user.id }, {
                        money: ehqkrduqn.money + moneya,
                        userid: user.id,
                        date: ehqkrduqn.date
                    })
                    const f = ehqkrduqn.money + moneya
                    const embed = new (require("discord.js")).EmbedBuilder()
                    .setTitle(`바카라 적중 [ 배팅 : 플레이어 ]`)
                    .setDescription(`**\`\`\`ansi
[0;31m금액지급 완료 : [0;37m+${comma(moneya)}원\n[0;31m현재잔액 : [0;37m${comma(f)}원\`\`\`**`)
                    .setColor("#2F3136")
                    .setThumbnail(interaction.member.user.displayAvatarURL({ dynamic: true }))
                    .setFooter({text: `${random} 숫자가 떴습니다.`})
                    await interaction.reply({ embeds: [embed] })
            }else{
                await Schema.findOneAndUpdate({ userid: user.id }, {
                    money: ehqkrduqn.money - money,
                    userid: user.id,
                    date: ehqkrduqn.date
                })
                const f = ehqkrduqn.money - money
                const embed = new (require("discord.js")).EmbedBuilder()
                .setTitle(`바카라 미적중 [ 배팅 : 플레이어 ]`)
                .setDescription(`**\`\`\`ansi
[0;31m금액회수 완료 : [0;37m-${comma(money)}원\n[0;31m현재잔액 : [0;37m${comma(f)}원\`\`\`**`)
                .setColor("#2F3136")
                .setThumbnail(interaction.member.user.displayAvatarURL({ dynamic: true }))
                .setFooter({text: `${random} 숫자가 떴습니다.`})
                await interaction.reply({ embeds: [embed] })
            }
        }else if (interaction.options.getSubcommand() === "타이") {
            const money = interaction.options.getInteger("배팅액")
            const ehqkrduqn = await Schema.findOne({ userid: interaction.user.id })
            if (!ehqkrduqn) return interaction.reply({
                embeds: [
                  new (require("discord.js")).EmbedBuilder()
                  .setTitle('SYSTEM API ERROR')
                  .setDescription(`등록 되지 않은 사용자입니다. [ /가입 ]`)
                  .setColor('#2F3136')
                ],
                ephemeral: true
              })
         if (money > ehqkrduqn.money) return interaction.reply({
            embeds: [
              new (require("discord.js")).EmbedBuilder()
              .setTitle('SYSTEM API ERROR')
              .setDescription(`소유하고 있는 머니보다 더 큰 금액을 배팅할 수 없습니다.`)
              .setColor('#2F3136')
            ],
            ephemeral: true
          })
          const user = interaction.user
          const wjdqh = await Schema.findOne({ userid: user.id })
          if (!wjdqh) return interaction.reply({
              embeds: [
                new (require("discord.js")).EmbedBuilder()
                .setTitle('SYSTEM API ERROR')
                .setDescription(`등록 되지 않은 사용자입니다.`)
                .setColor('#2F3136')
              ],
              ephemeral: true
            })
            const random = Math.floor(Math.random() * 22)

            if (random == 21){
                    var moneya = money * 11
                    await Schema.findOneAndUpdate({ userid: user.id }, {
                        money: ehqkrduqn.money + moneya,
                        userid: user.id,
                        date: ehqkrduqn.date
                    })
                    const f = ehqkrduqn.money + moneya
                    const embed = new (require("discord.js")).EmbedBuilder()
                    .setTitle(`바카라 적중 [ 배팅 : 타이 ]`)
                    .setDescription(`**\`\`\`ansi
[0;31m금액지급 완료 : [0;37m+${comma(moneya)}원\n[0;31m현재잔액 : [0;37m${comma(f)}원\`\`\`**`)
                    .setColor("#2F3136")
                    .setThumbnail(interaction.member.user.displayAvatarURL({ dynamic: true }))
                    .setFooter({text: `${random} 숫자가 떴습니다.`})
                    await interaction.reply({ embeds: [embed] })
            }else{
                await Schema.findOneAndUpdate({ userid: user.id }, {
                    money: ehqkrduqn.money - money,
                    userid: user.id,
                    date: ehqkrduqn.date
                })
                const f = ehqkrduqn.money - money
                const embed = new (require("discord.js")).EmbedBuilder()
                .setTitle(`바카라 미적중 [ 배팅 : 타이 ]`)
                .setDescription(`**\`\`\`ansi
[0;31m금액회수 완료 : [0;37m-${comma(money)}원\n[0;31m현재잔액 : [0;37m${comma(f)}원\`\`\`**`)
                .setColor("#2F3136")
                .setThumbnail(interaction.member.user.displayAvatarURL({ dynamic: true }))
                .setFooter({text: `${random} 숫자가 떴습니다.`})
                await interaction.reply({ embeds: [embed] })
            }
        }
    }
}