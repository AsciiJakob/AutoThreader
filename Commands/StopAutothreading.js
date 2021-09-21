const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const db = require("better-sqlite3")("storage/data.db", {});
module.exports = {
	data: new SlashCommandBuilder()
		.setName("stop_autothreading")
		.setDescription("Remove AutoThreading from a channel.")
		.addChannelOption((option) => option.setName("channel").setDescription("The channel to stop creating threads in.").setRequired(true)),
	async execute(interaction) {
		const channel = interaction.options.getChannel("channel");
		if (!channel.isText()) return await interaction.reply("❌ The channel specified is not a text-channel.");
		try {
			const returned = await db.prepare("DELETE FROM DATA WHERE channelId=?").run(channel.id);
			if (returned.changes > 0) {
				await interaction.reply("✅ <#"+channel.id+"> will no longer be AutoThreaded.");
			} else {
				await interaction.reply("❌ <#"+channel.id+"> is not being AutoThreaded.");
			}
		} catch(err) {
			console.log(err);
			return interaction.reply("❌ An unexpected error occured when interacting with our database.");
		}
		
	}
};