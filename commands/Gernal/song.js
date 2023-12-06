//14.8.0 discord.js 노래 기능 

// npm i @discordjs/opus
// npm i @discordjs/voice
// npm i ytdl-core
// npm i ffmpeg-static

const { SlashCommandBuilder } = require("discord.js")
const ytdl = require("ytdl-core")
const { joinVoiceChannel, createAudioPlayer, getVoiceConnection, createAudioResource } = require('@discordjs/voice');
const ytSearch = require("yt-search")

   module.exports = {
        data: new SlashCommandBuilder()
        .setName("노래")
        .setDescription("유튜브에서 노래를 실행합니다.")
        .addSubcommand(subcommand =>
            subcommand
            .setName("재생")
            .setDescription("노래를 실행합니다!")
            .addStringOption((f)=>f
            .setName("제목")
            .setDescription("노래 제목을 입력해주세요!")
            .setRequired(true)
          )
    ),

    async execute(interaction) {
        if (interaction.options.getSubcommand() === "재생") {
            await interaction.deferReply();
            const option_option = interaction.options.getString("제목")

            try{
                const search = await ytSearch(option_option);
                const searchRes = search.videos[0].url

                const userChannel = interaction.member.voice.channel;

                if (!userChannel){
                    interaction.editReply("보이스 채널에 들어가주세요.")
                    return
                }

                const audioPlayer = createAudioPlayer();

                const voice = joinVoiceChannel({
                    adapterCreator: interaction.guild.voiceAdapterCreator,
                    channelId: userChannel.id,
                    guildId: interaction.guildId
                });

                voice.subscribe(audioPlayer)

                const ytdlProcess = ytdl(searchRes, { filter: "audioonly" });

                ytdlProcess.on("error", (err) => console.log(err));

                audioPlayer.play(createAudioResource(ytdlProcess));

                ytdlProcess.on("end", () => 
                voice.disconnect() )

                return interaction.editReply({content:`노래를 재생합니다 : ${searchRes}`});

            }catch (err) {
                console.log(err)
            }
        }
    }
}