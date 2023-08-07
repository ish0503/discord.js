
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
    data: new SlashCommandBuilder()
      .setName("팀짜기")
      .setDescription("팀을 나눠줍니다.")
      .addIntegerOption((teamf) =>
      teamf.setName("숫자")
          .setDescription("팀짜기 숫자를 적어주세요!")
          .setMinValue(1)
          .setRequired(true)
      ),
      async execute(interaction){
          await interaction.deferReply();
      /**
     * @param {import("discord.js").Client} client
     */{
      var arg = interaction.options.getInteger("숫자");
      var membersArray = [];
      channel = interaction.channel.id
      let voiceChannel = interaction.member.voice.channel;
      if (!voiceChannel) {return interaction.editReply('음성 채널에 접속해주세요')}
      for (let member of voiceChannel.members) {
        membersArray.push('<@' + member[1].user.id + '>')
      }
      var teamArray = makeTeam(membersArray, Math.floor(arg));
  
      const result = teamArray.map((team, idx) => `${idx + 1}팀: ${team.join(', ')}`);
    
      await interaction.editReply(result.join('\n'));
    }
  
    function makeTeam(members, number) {
  
      const generateRandomKey = () => Math.floor(Math.random() * 1000);
    
      const membersWithKey = members.map(member => ({
        name: member,
        key: generateRandomKey(),
      }));
    
      const sortResult = membersWithKey.sort((a, b) => {
        return a.key >= b.key ? 1 : -1;
      });
    
      const membersWithoutKey = sortResult.map(res => res.name);
    
      const teamResult = [];
    
      for (let i = 0; i < members.length; i++) {
        const piece = [...membersWithoutKey].slice(i, i + number);
        teamResult.push(piece);
    
        i += number - 1;
      }
    
      return teamResult;
    }
  }
}