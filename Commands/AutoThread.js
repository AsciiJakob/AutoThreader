const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("better-sqlite3")("storage/data.db", {});
module.exports = {
	data: new SlashCommandBuilder()
		.setName("autothread")
		.setDescription("AutoThread a channel. Syntax: \"/autothread #channel\".")
		.addChannelOption((option) => option.setName('channel').setDescription("The channel to automatically create threads in.").setRequired(true)),
	async execute(interaction) {
		const channel = interaction.options.getChannel("channel");
		if (!channel.isText()) return await interaction.reply("❌ The channel specified is not a text-channel.");
		try {
			const currentRecord = db.prepare("SELECT * FROM data WHERE guildId = ? AND channelId = ?").get(interaction.guildId, channel.id);
			if (currentRecord) {
				return interaction.reply("❌ The channel specified is already being auto threaded.");
			}

			db.prepare("INSERT INTO data (guildId, channelId) VALUES (?, ?)").run(interaction.guildId, channel.id);
		} catch(err) {
			console.log(err);
			return interaction.reply("❌ An unexpected error occured when interacting with our database.");
		}

		await interaction.reply("✅ <#"+channel.id+"> will now have it's messages AutoThreaded.");
	},
};