const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const db = require("better-sqlite3")("storage/data.db", {});
module.exports = {
	data: new SlashCommandBuilder()
		.setName("list_autothreads")
		.setDescription("Lists all channels which has AutoThread enabled on them."),
	async execute(interaction) {
		let allAutoThreads;
		try {
			allAutoThreads = db.prepare("SELECT * FROM data WHERE guildId = ?").all(interaction.guildId);
		} catch(err) {
			console.log(err);
			return interaction.reply("❌ An unexpected error occured when interacting with our database.");
		}
		if (!allAutoThreads || allAutoThreads.length == 0) return interaction.reply("❌ There are no AutoThreaded channels present in this server. You can AutoThread a channel by writing \"/AutoThread #channel\"");
		
		const embed = new MessageEmbed()
        .setColor("#53a9ca")
        .setTitle(interaction.guild.name+"s AutoThreaded channels")
        .setDescription("Here is a list of all the channels being AutoThreaded in this server.")
		for (autoThread of allAutoThreads) {
			embed.addFields(
				{ name: "Channel", value: "<#"+autoThread.channelId.toString()+">" }
			)
		}
        interaction.reply({ embeds: [embed] });
	}
};