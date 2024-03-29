const client = require("../index")
const { Events, EmbedBuilder } = require("discord.js")
const cenkor = require('cenkor')
const filtering_Schema = require("../models/filter")

module.exports = {
  name: Events.MessageCreate,
  once: false,
  /**
     * 
     * @param {import("discord.js").Message} interaction
     */
  async execute(interaction) {
    if (interaction.author.bot){
      return;
    }

    let msg = interaction.content.toLowerCase();

    const filtering_find = await filtering_Schema.findOne({
      filterserver: interaction.guild.id,
    });

    async function filter(){
      if (interaction) {
        interaction.delete()
      }
      return;
    }

    if (filtering_find){
      if (filtering_find.filtermsg[0] == "Auto"){
        if (filtering_find.filterchannel.includes(String(interaction.channel.id)) || filtering_find.filterallchannel == true){
          for(i=0;i<filtering_find.adminroleid.length;i++){
            if (interaction.member.roles.cache.some(role => role.id == filtering_find.adminroleid[i])){
              return
            }
          }
          const result = cenkor(msg)
    
          if(result.filtered){
            console.log("필터로 인한 메시지 삭제 시도중")
            filter()
          }
        }
      }
    }

    // if ((msg.includes("ㅄ")) || (msg.includes("좃")) || (msg.includes("ㅗ")) || (msg.includes("새") && msg.includes("끼")) || (msg.includes("시") && msg.includes("발")) || (msg.includes("씨") && msg.includes("발")) || (msg.includes("병") && msg.includes("신")) || (msg.includes("ㅈ")) || (msg.includes("섹") && msg.includes("스")) || (msg.includes("ㅅ")) || (msg.includes("ㅆ")) || (msg.includes("좆")) || (msg.includes("조") && msg.includes("까")) || (msg.includes("븅") && msg.includes("신"))) {
    //   let msg2 = await interaction.reply("여기서 이 단어를 말할 수 없습니다!")
    //   if (interaction && msg2) {
    //     interaction.delete()
    //     msg2.delete()
    //   }
    //   return;
    // }
    
    
    if (interaction.content.substr(0, 2) == "야 ") {
      const Schema = require("../models/learning")
      const ffs = await Schema.find().exec()
      const include_word = []

      for (let i = 0; i < ffs.length; i++){
        if (interaction.content.includes(ffs[i].word)){
          include_word.push(ffs[i])
        }
      }

      if (include_word.length > 0){
        const randomword = include_word[Math.floor(Math.random() * include_word.length)]
        const meaning = randomword.meaning
        if (!randomword.userid) userid = "0"
        const username = client.users.cache.get(randomword.userid);
        if (username){
          interaction.channel.send(`**${meaning}** (${username.username}[${username.globalName}]님이 알려주셨어요!<:Heart:1157259695329906758>)`)
        }else{
          interaction.channel.send(`**${meaning}** (<@${randomword.userid}>]님이 알려주셨어요!<:Heart:1157259695329906758>)`)
        }
        }
      }else if(interaction.content.startsWith("!고르기") || interaction.content.startsWith("!선택")) {
        const args = interaction.content.slice("!".length).trim().split(/ +/),
          list = args.slice(1);
    
        if (!list.length) return interaction.reply("선택지를 입력해주세요!");
    
        const index = Math.floor(Math.random() * list.length);
    
        interaction.reply(`저의 선택은 \`${list[index]}\` 입니다`);
      }else if (interaction.content.startsWith("!맞춤법")) {
        if (interaction.type !== 19) return;
        const hanspell = require("hanspell");

        let Message = await interaction.channel.messages.fetch(
          interaction.reference.messageId
        ),
        Content = "",
        Types = {
          spell: "맞춤법",
          space: "띄어쓰기",
          space_spell: "맞춤법, 띄어쓰기",
          doubt: "표준어 의심",
        };
  
      if (!Message) return interaction.reply("메시지를 찾을 수 없습니다.");
      if (Message.embeds.length !== 0) {
        Content =
          Message.embeds[0].data.description || Message.embeds[0].data.title;
      } else {
        Content = Message.content;
      }
  
      const check = (result) => {
        if (result.length == 0)
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle("맞춤법 검사 | 올바른 문장")
                .setDescription(`### ${Content}`)
                .setColor("#18df8c"),
            ],
          });
        const Embed = new EmbedBuilder();
        for (let i = 0; i < result.length; i++) {
          Embed.addFields({
            name: `**${i + 1}**. ${result[i].token} → ${
              result[i].suggestions[0]
            } (${Types[result[i].type] ?? "알 수 없는"} 오류)`,
            value: `**${result[i].info}**`,
          });
        }
        return interaction.reply({
          embeds: [
            Embed.setTitle("맞춤법 검사")
              .setDescription(`### ${Content}`)
              .setColor("#DF1853"),
          ],
        });
      };
  
      const error = () => {
        return interaction.reply({
          content: "오류",
        });
      };
  
      hanspell.spellCheckByDAUM(Content, 5000, check, () => {}, error);
      }
}}
