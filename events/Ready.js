const { Client, Collection } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    let number = 0
    setInterval(() => {
        const list = [`현재 ${client.guilds.cache.size}개의 서버에서 휴식`] 
        if(number == list.length) number = 0
        client.user.setActivity(list[number],{
            type: Client.Playing
        })
        number++
    }, 10000)
    console.log(`${client.user.tag} 봇 이 준비되었습니다.`)
  },
};
