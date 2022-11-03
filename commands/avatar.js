const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Displays the provided user\'s avatar, or yours if you don\'t provide.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user whose avatar you want')
				.setRequired(false)),
	async execute(interaction) {
        let user;
        if (!interaction.options.getUser('user')) {
            user = interaction.user;
        }
        else {
            user = interaction.options.getUser('user');
        }
		await interaction.reply({
			embeds: [
				{
					title: `${user.username}\'s avatar`,
					image: {
                        url: user.displayAvatarURL()
					},
					color: 0xFDFDFD
				}
			]
		});
	}
};