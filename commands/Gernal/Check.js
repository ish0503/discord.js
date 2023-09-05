const { Events, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const { Captcha } = require("captcha-canvas");

module.exports = {
  name: Events.MessageCreate,
  /**
   *
   * @param {import("discord.js").Message} message
   */
  async execute(message) {
    if (message.content == "!인증") {
      try {
        const captcha = new Captcha();
        captcha.async = true;
        captcha.addDecoy();
        captcha.drawTrace({ color: `#000000` });
        captcha.drawCaptcha({
          color: `#FFFFFF`,
          size: `45`,
        });

        const captchaAttachment = new AttachmentBuilder(
          await captcha.png,
          "captcha.png"
        );

        var embed = new (require("discord.js").EmbedBuilder)()
          .setTitle(`인증을 받아주세요. [ 제한 시간 : 30초 ]`)
          .setImage(captchaAttachment)
          .addFields(
            {
              name: "userid",
              value: `\`\`\`${message.author.id}\`\`\``,
              inline: true,
            },
            {
              name: "usertag",
              value: `\`\`\`${message.author.tag}\`\`\``,
              inline: true,
            }
          );
        message.channel.send({ embeds: [embed], files: [captchaAttachment] });
        try {
          const filter = (m) => {
            if (m.author.bot) return;
            if (m.author !== message.author) return;
            if (m.content === captcha.text) return true;
            else {
              var embed = new (require("discord.js").EmbedBuilder)().setTitle(
                `[ 인증 실패 ( 대소문자 구분 필수 ) ]`
              );
              message.reply({ embeds: [embed] });
            }
          };

          const response = await message.channel.awaitMessages({
            filter,
            max: 1,
            time: 30000,
            errors: ["time"],
          });
          if (response) {
            message.member.roles.add("1148565953416790039");
            var embed1 = new (require("discord.js").EmbedBuilder)()
              .setTitle(`[ 인증 완료 ]`)
              .addFields(
                {
                  name: "userid",
                  value: `\`\`\`${message.author.id}\`\`\``,
                  inline: true,
                },
                {
                  name: "usertag",
                  value: `\`\`\`${message.author.tag}\`\`\``,
                  inline: true,
                }
              );
            message.channel.send({ embeds: [embed1] });
          }
        } catch (error) {
          var embed = new (require("discord.js").EmbedBuilder)()
            .setTitle(`[ 인증 실패 ( 시간 초과 )]`)
            .addFields(
              {
                name: "userid",
                value: `\`\`\`${message.author.id}\`\`\``,
                inline: true,
              },
              {
                name: "usertag",
                value: `\`\`\`${message.author.tag}\`\`\``,
                inline: true,
              }
            );
          message.reply({ embeds: [embed] });
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
};
