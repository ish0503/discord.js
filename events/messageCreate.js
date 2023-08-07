module.exports = {
  name: "messageCreate",
  once: false,
  execute(message) {
    if (message.content == "채팅봇") {
      message.reply({ content: `**접니다!**` });
    }
  },
};