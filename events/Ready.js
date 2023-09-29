const { Client, Collection } = require("discord.js");
const stock_Schema = require("../models/stock");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    let number = 0
    setInterval(() => {
        const list = [`현재 ${client.guilds.cache.size}개의 서버에서 게임` , "자는것", "대화"] 
        if(number == list.length) number = 0
        client.user.setActivity(list[number],{
            type: Client.Playing
        })
        number++
    }, 10000)
    console.log(`${client.user.tag} 봇 이 준비되었습니다.`)

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    const stockone = await stock_Schema.findOne({
      name: "껌딱지 주식회사"
    })
    
    const stocktwo = await stock_Schema.findOne({
      name: "새늅 주식회사"
    })
    
    const stockthree= await stock_Schema.findOne({
      name: "로즈 주식회사"
    })
    
    const stockfour = await stock_Schema.findOne({
      name: "토리 코퍼레이션"
    })
    
    setInterval(async() => {
      num = getRandomArbitrary(50,150) / 100;
      await stock_Schema.updateOne(
        {name: "껌딱지 주식회사"},
        {money: Math.round((stockone?.money || 10000) * num),
        desc: "껌을 만드는 회사",
        image: "",
        percent: ((num * 100) - 100).toFixed(2),
        },
        {upsert:true},
      );
      num = getRandomArbitrary(50,150) / 100;
      await stock_Schema.updateOne(
        {name: "새늅 주식회사"},
        {money: Math.round((stocktwo?.money || 20000) * num),
        desc: "멸종위기의 새를 보존하는 회사",
        image: "https://cdn.discordapp.com/avatars/929974091614670938/9a03f0b69e612fc46b08e7b06205c396.webp?size=80",
        percent: ((num * 100) - 100).toFixed(2),
        },
        {upsert:true},
      );
      num = getRandomArbitrary(50,150) / 100;
      await stock_Schema.updateOne(
        {name: "로즈 주식회사"},
        {money: Math.round((stockthree?.money || 7000) * num),
        desc: "장미를 유전자 조작하는 회사",
        image: "",
        percent: ((num * 100) - 100).toFixed(2),
        },
        {upsert:true},
      );
      num = getRandomArbitrary(50,150) / 100;
      await stock_Schema.updateOne(
        {name: "토리 코퍼레이션"},
        {money: Math.round((stockfour?.money || 15000) * num),
        desc: "도토리 따는 회사",
        image: "",
        percent: ((num * 100) - 100).toFixed(2),
        },
        {upsert:true},
      );
    }, 600000);
  },
};
