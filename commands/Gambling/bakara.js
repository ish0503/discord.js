const Schema = require("../../models/Money")
const { SlashCommandBuilder } = require('discord.js');
const comma = require("comma-number")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("바카라변형")
        .setDescription("번호를 뽑아서 하는 바카라를 해보십시오.")
        .addSubcommand(subcommand =>
          subcommand
            .setName("뱅커")
            .setDescription("뱅커 배팅 (1부터 20까지 랜덤으로 뽑아 홀수일때 돈 획득) [ 배당 0.95배 ]")
            .addIntegerOption(f => 
              f.setName("배팅액")
              .setDescription("배팅하실 금액을 입력해 주세요")
              .setRequired(true)
              .setMinValue(1000))
        )
        .addSubcommand(subcommand =>
              subcommand
                .setName("플레이어")
                .setDescription("플레이어 배팅 (1에서 21까지 랜덤으로 뽑아 짝수일때 돈 획득) [ 배당 1배 ]")
                .addIntegerOption(f => 
                  f.setName("배팅액")
                  .setDescription("배팅하실 금액을 입력해 주세요")
                  .setRequired(true)
                  .setMinValue(1000))
            )
        .addSubcommand(subcommand =>
              subcommand
                .setName("타이")
                .setDescription("타이 배팅 (1에서 21까지 뽑아 21일때 돈 획득) [ 배당 10배 ]")
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
                  .setDescription(`돈이 없습니다. /돈 으로 지원금을 받으세요.`)
                  .setColor('Red')
                ],
                ephemeral: true
              })
         if (money > ehqkrduqn.money) return interaction.reply({
            embeds: [
              new (require("discord.js")).EmbedBuilder()
              .setTitle('SYSTEM API ERROR')
              .setDescription(`소유하고 있는 머니보다 더 큰 금액을 배팅할 수 없습니다.`)
              .setColor('Red')
            ],
            ephemeral: true
          })
          const user = interaction.user
          const wjdqh = await Schema.findOne({ userid: user.id })
          if (!wjdqh) return interaction.reply({
              embeds: [
                new (require("discord.js")).EmbedBuilder()
                .setTitle('SYSTEM API ERROR')
                .setDescription(`돈이 등록되있지 않은 사용자입니다.`)
                .setColor('Red')
              ],
              ephemeral: true
            })
            const random = Math.floor(Math.random() * 20)

            if (random == 1 || random == 3 || random == 5 || random == 7 || random == 9 || random == 11 || random == 13 || random == 15 || random == 17 || random == 19){
                    var moneya = money * 0.95
                    await Schema.findOneAndUpdate({ userid: user.id }, {
                        money: ehqkrduqn.money + moneya,
                        userid: user.id,
                        date: ehqkrduqn.date
                    })
                    const f = ehqkrduqn.money + moneya
                    const embed = new (require("discord.js")).EmbedBuilder()
                    .setTitle(`바카라 적중 [ 배팅 : 뱅커 ]`)
                    .setDescription(`**
금액지급 완료 : +${comma(moneya)}원\n현재잔액 : ${comma(f)}원**`)
                    .setColor("Green")
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
                .setDescription(`**
금액회수 완료 : -${comma(money)}원\n현재잔액 : ${comma(f)}원**`)
                .setColor("Red")
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
                  .setDescription(`돈이 없습니다. /돈 으로 지원금을 받으세요.`)
                  .setColor('Red')
                ],
                ephemeral: true
              })
         if (money > ehqkrduqn.money) return interaction.reply({
            embeds: [
              new (require("discord.js")).EmbedBuilder()
              .setTitle('SYSTEM API ERROR')
              .setDescription(`소유하고 있는 머니보다 더 큰 금액을 배팅할 수 없습니다.`)
              .setColor('Red')
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
                .setColor('Red')
              ],
              ephemeral: true
            })
            const random = Math.floor(Math.random() * 21)

            if (random == 2 || random == 4 || random == 6 || random == 8 || random == 10 || random == 12 || random == 14 || random == 16 || random == 18 || random == 20){
                    var moneya = money * 1
                    await Schema.findOneAndUpdate({ userid: user.id }, {
                        money: ehqkrduqn.money + moneya,
                        userid: user.id,
                        date: ehqkrduqn.date
                    })
                    const f = ehqkrduqn.money + moneya
                    const embed = new (require("discord.js")).EmbedBuilder()
                    .setTitle(`바카라 적중 [ 배팅 : 플레이어 ]`)
                    .setDescription(`**
금액지급 완료 : +${comma(moneya)}원\n현재잔액 : ${comma(f)}원**`)
                    .setColor("Green")
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
                .setDescription(`**
금액회수 완료 : -${comma(money)}원\n현재잔액 : ${comma(f)}원**`)
                .setColor("Red")
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
                  .setDescription(`돈이 없습니다. /돈 으로 지원금을 받으세요.`)
                  .setColor('Red')
                ],
                ephemeral: true
              })
         if (money > ehqkrduqn.money) return interaction.reply({
            embeds: [
              new (require("discord.js")).EmbedBuilder()
              .setTitle('SYSTEM API ERROR')
              .setDescription(`소유하고 있는 머니보다 더 큰 금액을 배팅할 수 없습니다.`)
              .setColor('Red')
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
                .setColor('Red')
              ],
              ephemeral: true
            })
            const random = Math.floor(Math.random() * 21)

            if (random == 21){
                    var moneya = money * 10
                    await Schema.findOneAndUpdate({ userid: user.id }, {
                        money: ehqkrduqn.money + moneya,
                        userid: user.id,
                        date: ehqkrduqn.date
                    })
                    const f = ehqkrduqn.money + moneya
                    const embed = new (require("discord.js")).EmbedBuilder()
                    .setTitle(`바카라 적중 [ 배팅 : 타이 ]`)
                    .setDescription(`**
금액지급 완료 : +${comma(moneya)}원\n현재잔액 : ${comma(f)}원**`)
                    .setColor("Green")
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
                .setDescription(`**
금액회수 완료 : -${comma(money)}원\n현재잔액 : ${comma(f)}원**`)
                .setColor("Red")
                .setThumbnail(interaction.member.user.displayAvatarURL({ dynamic: true }))
                .setFooter({text: `${random} 숫자가 떴습니다.`})
                await interaction.reply({ embeds: [embed] })
            }
        }
    }
}
