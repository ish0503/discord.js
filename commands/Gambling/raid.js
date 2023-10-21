const {
    SlashCommandBuilder,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle,
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

        const confirm = new ButtonBuilder()
			.setCustomId(`참가`)
			.setLabel(`참가`)
			.setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder()
            .addComponents(confirm);

        // const thread = await interaction.channel.threads.create({
        //     name: '레이드',
        //     autoArchiveDuration: 60,
        //     type: ChannelType.PrivateThread,
        //     reason: '레이드를 위한 스레드',
        // });

        await interaction.reply({
            content: `참가하시겠습니까?`,
            components: [row],
        });
    },
  };