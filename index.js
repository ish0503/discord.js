const dotenv = require("dotenv");
dotenv.config();

const TOKENB = "MTEzNzAwMjczNzI2ODE2MjU3MA.GelQAg.MhRKbwPe"
const TOKENA = "-xpa3YGtPAjbB1dKOJHZzfaBP1gt1k"

console.log(TOKENB + TOKENA)

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
client.login(TOKENB + TOKENA);

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

const rest = new REST({ version: "10" }).setToken(TOKENB + TOKENA);

rest
  .put(Routes.applicationCommands("1137002737268162570"), { body: commands_json })
  .then((command) => console.log(`${command.length}개의 커맨드를 푸쉬했습니다`))
  .catch(console.error);
