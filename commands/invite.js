const { SlashCommandBuilder, PermissionFlagsBits, OAuth2Scopes } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Generates a link for you to add Hardwick to your server!'),
    async execute(interaction) {
        const inviteLink = interaction.client.generateInvite({
            permissions: [
                PermissionFlagsBits.Administrator
            ],
            scopes: [OAuth2Scopes.Bot]
        });
        await interaction.reply({
            embeds: [
                {
                    title: 'Add me to your server',
                    description: `[:robot: Add bot](${inviteLink})`,
                    thumbnail: {
                        url: 'https://pbs.twimg.com/media/Dj3fVupV4AAhIwD.png:large'
                    },
                    color: 0xFDFDFD
                }
            ],
            ephemeral: true
        });
    }
}