const client = require("../index")
import fetch from 'node-fetch'

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(interaction) {
    const Schema = require("../models/learning")
    const args = interaction.content.slice(1).trim().split(/ +/) 
    const argsjoin = args.join(" ")
    const ff = await Schema.findOne({ word: argsjoin })
    if (ff && interaction.content.substr(0, 1) == "야") {
      const meaning = ff.meaning
      //let user = userid//interaction.member
      if (!ff.userid) userid = "0"
      const username = client.users.cache.get(ff.userid);
      if (username){
        interaction.channel.send(`**${meaning}** (${username.username}[${username.globalName}]님이 알려주셨어요!<:Heart:1151445619215441980>)`)
      }else{
        interaction.channel.send(`**${meaning}** (<@${ff.userid}>]님이 알려주셨어요!<:Heart:1151445619215441980>)`)
      }
      
      //interaction.channel.recipientId(`\`${ff.meaning}``\n${user.tag || user}님이 알려주셨어요 !`)
      }else if(interaction.content.startsWith("!골라")) {
    const args = interaction.content.slice("!".length).trim().split(/ +/),
      list = args.slice(1);

    if (!list.length) return interaction.reply("선택지를 입력해주세요!");

    const index = Math.floor(Math.random() * list.length);

    interaction.reply(`저의 선택은 \`${list[index]}\` 입니다`);
  } else if (interaction.content === "!한강온도") {
    const types = ["text", "time", "dgr"],
      BASE_URL = "https://hangang.ivlis.kr/aapi.php?type=";

    const fetchData = async (type) => {
      const res = await fetch(BASE_URL + type);
      const data = await res.text();
      return data;
    };

    const [text, time, dgr] = await Promise.all(types.map(fetchData));

    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("한강 온도")
          .setDescription(`# ${dgr}\n### ${text}`)
          .setAuthor({
            name: time,
            iconURL: client.user.avatarURL(),
          })
          .setFooter({
            text: "생명은 소중하며, 당신은 사랑과 지지를 받을 **가치**가 있습니다. (데이터: hangang.ivlis.kr)",
          }),
      ],
    });
  }
}}
