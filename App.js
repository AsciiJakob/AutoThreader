require("dotenv").config()
const { Client, Collection } = require("discord.js");
const db = require("better-sqlite3")("storage/data.db", {});
const fs = require("fs");
const EventsHandler = require("./EventsHandler")

const client = new Client({
	intents: ["GUILDS", "GUILD_MESSAGES"]
});

client.commands = new Collection();
const commandFiles = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require("./Commands/"+file);
	client.commands.set(command.data.name, command);
}


db.prepare("CREATE TABLE IF NOT EXISTS data(id INTEGER NOT NULL PRIMARY KEY, guildId TEXT NOT NULL, channelId TEXT NOT NULL)").run()
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setPresence({activities: [{name:"Threading 😎"}]})
});
client.on("error", console.error);


client.on("interactionCreate", EventsHandler.interactionCreate);
client.on("messageCreate", EventsHandler.messageCreate);
client.on("guildDelete", EventsHandler.guildDelete);
client.on("channelDelete", EventsHandler.channelDelete);


client.login(process.env.BOT_TOKEN);