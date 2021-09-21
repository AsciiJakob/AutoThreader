const db = require("better-sqlite3")("storage/data.db", {});
module.exports = {
	interactionCreate: async (interaction) => {
		if (!interaction.isCommand()) return;
		if (!interaction.inGuild()) return await interaction.reply("❌ Commands for this bot will only work in servers.");
	
		const command = interaction.client.commands.get(interaction.commandName);
	
		if (!command) return;
	
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
		}
	},

	messageCreate: async (message) => {
		const isAutoThreadingChannel = db.prepare("SELECT * FROM data WHERE channelId=?").get(message.channelId);
		if (!isAutoThreadingChannel) return;
		await message.startThread({
			name: message.content.substring(0,99) || "Discussion",
			autoArchiveDuration: "MAX"
		})
	},

	guildDelete: async (guild) => {
		db.prepare("DELETE FROM DATA WHERE guildId=?").run(guild.id);
	},

	channelDelete: async (channel) => {
		db.prepare("DELETE FROM DATA WHERE channelId=?").run(channel.id);
	}
}