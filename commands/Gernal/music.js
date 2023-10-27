const { SlashCommandBuilder , EmbedBuilder} = require('discord.js');
const { createAudioPlayer, createAudioResource, joinVoiceChannel, AudioPlayerStatus } = require('@discordjs/voice');
const yts = require('yt-search');
const ytdl = require('ytdl-core');

const queue = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('음악')
        .setDescription('노래를 재생합니다.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('재생')
                .setDescription('노래를 재생합니다.')
                .addStringOption(option =>
                    option.setName('query')
                        .setDescription('재생할 노래의 제목 또는 링크를 입력하세요.')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('일시정지')
                .setDescription('노래를 일시정지합니다.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('재개')
                .setDescription('일시정지된 노래를 다시 재생합니다.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('정지')
                .setDescription('노래를 정지하고 대기열을 초기화합니다.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('대기열')
                .setDescription('대기열 목록을 보여줍니다.')),
    async execute(interaction) {
        await interaction.deferReply()
        const subcommand = interaction.options.getSubcommand();
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return interaction.editReply('음성 채널에 참가해주세요.');

        const serverQueue = queue.get(interaction.guildId);

        if (subcommand === '재생') {
            const query = interaction.options.getString('query');
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });

            const searchResult = await yts(query);

            const video = searchResult.videos[0];

            console.log(video)

            const audioPlayer = createAudioPlayer();
            const stream = await ytdl(video.url, { filter: 'audioonly' });
            const resource = createAudioResource(stream);
            //audioPlayer.play(resource);

            const song = { title: video.title, url: video.url };
            if (serverQueue) {
                serverQueue.songs.push(song);
                return interaction.editReply({embeds: [new EmbedBuilder().setTitle('노래 재생').setDescription(`${song.title}을(를) 대기열에 추가했습니다.`).setColor('FF0000')]});
            } else {
                const queueContruct = {
                    voiceChannel,
                    connection,
                    audioPlayer,
                    songs: [song],
                    playing: true,
                };
                queue.set(interaction.guildId, queueContruct);

                connection.subscribe(audioPlayer);

                const stream = ytdl(queueContruct.songs[0].url, { filter: 'audioonly' });
                const resource = createAudioResource(stream);
                audioPlayer.play(resource);

                audioPlayer.on(AudioPlayerStatus.Idle, () => {
                    queueContruct.songs.shift();
                    if (queueContruct.songs.length === 0) {
                        queueContruct.playing = false;
                        connection.destroy(); // 대기열에 더 이상 노래가 없으면 연결을 해제합니다
                        return;
                    }
                    console.log(queueContruct.songs[0])
                    // const stream = ytdl(queueContruct.songs[0].url, { filter: 'audioonly' });
                    // const resource = createAudioResource(stream);
                    // audioPlayer.play(resource);
                });

                audioPlayer.on('error', error => {
                    console.error(`Error: ${error.message} with resource ${error.resource}`);
                    queueContruct.songs.shift();
                    if (queueContruct.songs.length === 0) {
                        queueContruct.playing = false;
                        connection.destroy(); // 대기열에 더 이상 노래가 없으면 연결을 해제합니다
                    }
                    // const stream = ytdl(queueContruct.songs[0].url, { filter: 'audioonly' });
                    // const resource = createAudioResource(stream);
                    // audioPlayer.play(resource);
                });

                return interaction.editReply({ embeds: [new EmbedBuilder().setTitle('노래 재생').setDescription(`${song.title}을(를) 재생합니다.`).setColor('FF0000')] });
            }
        }

        if (subcommand === '일시정지') {
            if (serverQueue && serverQueue.playing) {
                serverQueue.playing = false;
                serverQueue.audioPlayer.pause();
                return interaction.editReply('노래를 일시정지했습니다.');
            }
            return interaction.editReply('현재 재생 중인 노래가 없습니다.');
        }

        if (subcommand === '재개') {
            if (serverQueue && !serverQueue.playing) {
                serverQueue.playing = true;
                serverQueue.audioPlayer.unpause();
                return interaction.editReply('노래를 다시 재생합니다.');
            }
            return interaction.editReply('현재 재생 중인 노래가 없습니다.');
        }

        if (subcommand === '정지') {
            if (serverQueue) {
                serverQueue.songs = [];
                serverQueue.playing = false;
                serverQueue.connection.destroy();
                queue.delete(interaction.guildId);
                return interaction.editReply('노래를 정지하고 대기열을 초기화했습니다.');
            }
            return interaction.editReply('현재 재생 중인 노래가 없습니다.');
        }

        if (subcommand === '대기열') {
            if (serverQueue && serverQueue.songs.length > 0) {
                const queueList = serverQueue.songs.map((song, index) => `${index + 1}. **${song.title}**`);
                return interaction.editReply({embeds: [new EmbedBuilder().setTitle('대기열').setDescription(queueList.join('\n')).setColor('FF0000')]});
            }
            return interaction.editReply('대기열이 비어있습니다.');
        }
    },
};