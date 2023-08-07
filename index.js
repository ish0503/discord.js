const dotenv = require("dotenv");
dotenv.config();

/*const express = require("express")
const app = express()

const port = 3000;

app.get("/", (req,res)=>{
  res.send("Hello, world!")
})

app.listen(port, () => {
  console.log("3000 PORT OPEN")
})*/

const { Client, Collection, REST, Routes } = require("discord.js");
const client = (module.exports = new Client({ intents: [131071] }));
client.login(process.env.TOKEN);

//const { Configuration, OpenAIApi } = require("openai");
//const configuration = new Configuration
//({apiKey: "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"
//});

//const configuration2 = new configuration2({apiKey: "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"})

//이차함수 그래프 그리기
/*const { createCanvas } = require('canvas');

const canvasWidth = 500;
const canvasHeight = 500; 
const axisColor = '#000000';
const graphColor = '#FF0000';
const axisWidth = 2; 
const graphWidth = 3; 
const xMin = -10; 
const xMax = 10; 
const yMin = -10; 
const yMax = 10; 
const step = 0.1; 

const quadraticFunction = (x, a, b, c) => {
    return a * x * x + b * x + c;
};

const canvas = createCanvas(canvasWidth, canvasHeight);
const ctx = canvas.getContext('2d');*/

//여기까지

//const openai = new OpenAIApi(configuration)

//if (Math.random(1,2) == 1){
  //openai = new OpenAIApi(configuration)
//;}else{
  //openai = new OpenAIApi(configuration2);
//}

//const chapGPT = async (prompt, prompt2) => {
//const response = await openai.createChatCompletion({
//model: "gpt-3.5-turbo",
//messages: [{ role: "user", content: prompt2 }],
//});
  //if (response["data"]["choices"][0]["message"]["content"] != "Promise { <pending> }")  {
  //prompt.channel.startTyping();
   //prompt.reply(response["data"]["choices"][0]["message"]["content"]);
  //prompt.channel.stopTyping();
    //return response["data"]["choices"][0]["message"]["content"];
  //};
//return response["data"]["choices"][0]["message"]["content"];
//};

/*client.once("ready", () => {
  let number = 0
    setInterval(() => {
        const list = [`현재 ${client.guilds.cache.size} 개의 서버에 침투` , "자는것", "대화"] 
        if(number == list.length) number = 0
        client.user.setActivity(list[number],{
            type: Client.Playing
        })
        number++
    }, 10000)
    console.log(`${client.user.tag} 봇 이 준비되었습니다.`)
});*/

/*client.on("messageCreate", (message) => {
  if(!message.content.startsWith("!")) return
    const args = message.content.slice("!".length).trim().split(/ +/)
    const commandName = args.shift()
    if (commandName == "chat") {
    var pluschat = "";
      var number = 0;
      for (const key in args){
        pluschat += args[number]
        number++
      }
    if (!args[0]) { message.reply("올바른 값 입력 부탁"); return }
    try{
      console.log(pluschat)
      console.log(pluschat)//args[0]);
      //message.channel.startTyping()
        chapGPT(message,args[0]);
   // message.channel.stopTyping()
        //chapGPT(message);
    } catch (error) {
        console.error(error)
    }
    }
});*/

const fs = require("fs");

const eventsPath = "./events";
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = `./${eventsPath}/${file}`;
  const event = require(filePath);
  if (event.once == true) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.commands = new Collection();

const commands_json = [];

const commandsCategoryPath = "./commands";
const commandsCategoryFiles = fs.readdirSync(commandsCategoryPath);

for (const category of commandsCategoryFiles) {
  const commandsPath = `./commands/${category}`;
  const commandsFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandsFiles) {
    const command = require(`./commands/${category}/${file}`);
    client.commands.set(command.data.name, command);
    commands_json.push(command.data.toJSON());
  }
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

rest
  .put(Routes.applicationCommands(process.env.ID), { body: commands_json })
  .then((command) => console.log(`${command.length}개의 커맨드를 푸쉬했습니다`))
  .catch(console.error);