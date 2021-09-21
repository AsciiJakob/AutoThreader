require("dotenv").config()
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = [];
const commandFiles = fs.readdirSync("./Commands").filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./Commands/${file}`);
	console.log("Registering command: ", file);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);

(async () => {
	try {
		await rest.put(
			Routes.applicationCommands(process.env.BOT_CLIENTID),
			{ body: commands },
		);

		console.log("Successfully registered application commands.");
	} catch (error) {
		console.error(error);
	}
})();