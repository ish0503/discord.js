const {
    SlashCommandBuilder,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle,
    ChannelType,
  } = require("discord.js");
  const comma = require("comma-number");
const { table } = require("node:console");
  const wait = require('node:timers/promises').setTimeout;
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("레이드")
      .setDescription("레이드를 시작해 보스 몬스터에 도전하세요."),
    /**
     *
     * @param {import("discord.js").ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply()
	    if (interaction.channel.threads.cache.find(x => x.name === '레이드')){
		    await interaction.editReply({
                       content: `이 채널에서 이미 레이드가 진행중입니다.?`,
                   });
		    return;
	    }

	 const thread = interaction.channel.threads.create({
          name: '레이드',
          autoArchiveDuration: 60,
          type: ChannelType.PrivateThread,
          reason: '레이드를 위한 스레드',
         });

        const confirm = new ButtonBuilder()
			.setCustomId(`참가`)
			.setLabel(`참가`)
			.setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder()
            .addComponents(confirm);

        // const thread = await interaction.channel.threads.create({
         //   name: '레이드',
           //  autoArchiveDuration: 60,
     //        type: ChannelType.PrivateThread,
  //           reason: '레이드를 위한 스레드',
    //    });

        await interaction.editReply({
            content: `참가하시겠습니까?`,
            components: [row],
        });

        await wait(60000)

        interaction.channel.send("이제 시작합니다.")

        interaction.deleteReply()

	const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.first();

	    if (!webhook){
	         interaction.channel.send("레이드를 진행하려면 웹후크가 필요합니다.")
		thread.delete()
                  return
	    }

        await webhook.send({
	      content: 'Look ma! I\'m in a thread!',
	      threadId: thread.id,
       });
    },
  };
2
