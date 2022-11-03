const { SlashCommandBuilder } = require('discord.js');
const request = require('superagent');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('advice')
		.setDescription('Sends you some unsolicited advice. Hardwick devs aren\'t responsible for uncomfortable truths.'),
	async execute(interaction) {
		request.get('https://api.adviceslip.com/advice').end(async (err, res) => {
			if (!err && res.status === 200) {
				const advice = JSON.parse(res.text);
				await interaction.reply({
					embeds: [
						{
							title: `Advice for you, ${interaction.user.username}!`,
							description: advice.slip.advice,
							thumbnail: {
								url: 'https://toppng.com/download/zosAhRyq14qYLFhMzkN0klG1gT7OCYXjtiDubyBZ17RMhAtiEevA7GWNbg88GFeOopM9P35Sok77EZjrcTSw8FzrcmhCnTyOOb04Z8RSV9iKHdCwYaoIffPfJn8xvvT7R0KY17wtm91MsQICGukQ58tow50Ke4amuO631KoWJ0oAqUryjjclRKJszPPampihaWhNzdf3/large',
							},
							color: 0xFDFDFD,
						},
					],
				});
			}
		});
	},
};