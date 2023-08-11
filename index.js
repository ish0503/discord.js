const dotenv = require("dotenv");
dotenv.config();

const TOKENB = "OTg5NDMzODE1NTM5Nzc3NTQ2."
const TOKENA = "GyzKqm.tELFo8bqvuA2J_YbFK2R3wPT8_8uW2cMh3ik20"

console.log(TOKENB + TOKENA)
console.log(process.env.TOKEN)

const express = require("express")
const app = express()

const port = 3000;

app.get("/", (req,res)=>{
  res.send("Hello, world!")
})

app.listen(port, () => {
  console.log("3000 PORT OPEN")
})

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
  .put(Routes.applicationCommands("989433815539777546"), { body: commands_json })
  .then((command) => console.log(`${command.length}개의 커맨드를 푸쉬했습니다`))
  .catch(console.error);
