const { Client, Collection } = require("discord.js");
const stock_Schema = require("../models/stock");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    let number = 0
    setInterval(() => {
        const list = [`현재 ${client.guilds.cache.size}개의 서버에서 게임`] 
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

    let lastupdate = Date.now()
    
    setInterval(async() => {
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
      console.log("주식 업데이트 됨")
      lastupdate = Date.now()
      num = getRandomArbitrary(50,150) / 100;
      await stock_Schema.updateOne(
        {name: "껌딱지 주식회사"},
        {money: Math.round((stockone?.money || 10000) * num),
        desc: `껌을 만드는 회사 (마지막 업데이트: <t:${Math.round(lastupdate / 1000)}:R>)`,
        percent: ((num * 100) - 100).toFixed(2),
        },
        {upsert:true},
      );
      num = getRandomArbitrary(50,150) / 100;
      await stock_Schema.updateOne(
        {name: "새늅 주식회사"},
        {money: Math.round((stocktwo?.money || 20000) * num),
        desc: `멸종위기의 새를 보존하는 회사 (마지막 업데이트: <t:${Math.round(lastupdate / 1000)}:R>)`,
        percent: ((num * 100) - 100).toFixed(2),
        },
        {upsert:true},
      );
      num = getRandomArbitrary(50,150) / 100;
      await stock_Schema.updateOne(
        {name: "로즈 주식회사"},
        {money: Math.round((stockthree?.money || 7000) * num),
        desc: `장미를 유전자 조작하는 회사 (마지막 업데이트: <t:${Math.round(lastupdate / 1000)}:R>)`,
        percent: ((num * 100) - 100).toFixed(2),
        },
        {upsert:true},
      );
      num = getRandomArbitrary(50,150) / 100;
      await stock_Schema.updateOne(
        {name: "토리 코퍼레이션"},
        {money: Math.round((stockfour?.money || 15000) * num),
        desc: `도토리 따는 회사 (마지막 업데이트: <t:${Math.round(lastupdate / 1000)}:R>)`,
        percent: ((num * 100) - 100).toFixed(2),
        },
        {upsert:true},
      );
    }, 300000);
  },
};
