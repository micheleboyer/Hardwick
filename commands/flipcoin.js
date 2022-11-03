const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('flipcoin')
        .setDescription('Flips a coin and displays the result.'),
    async execute(interaction) {
        let result;
        var coin = Math.floor(Math.random() * 2);
        if (coin === 0) {
            result = 'It\'s heads!'
        } else {
            result = 'It\'s tails!';
        }
        await interaction.reply({
            embeds: [
                {
                    title: '\\*flips coin\\*',
                    description: result,
                    color: 0xFDFDFD
                }
            ]
        });
    }
}