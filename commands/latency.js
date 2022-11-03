const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('latency')
        .setDescription('Reports latency between servers and Discord API. Am I speedy enough?'),
    async execute(interaction) {
        let result = {
            name: "Discord may be undergoing an outage event.",
            value:
                "Head over to https://status.discord.com/ to monitor developing situtations."
        };
        if (Math.round(interaction.client.ws.ping) < 60) {
            await interaction.reply({
                embeds: [
                    {
                        title: 'Pong!',
                        color: 0x00ff00,
                        fields: [
                            {name: 'API latency', value: `${Math.round(interaction.client.ws.ping)} ms`}
                        ],
                        thumbnail: {url: 'https://www.iconsdb.com/icons/preview/white/ping-pong-xxl.png'}
                    }
                ],
                ephemeral: true
            });
        } else if (Math.round(interaction.client.ws.ping) >= 60 &&
            Math.round(interaction.client.ws.ping) < 100) {
            await interaction.reply({
                embeds: [
                    {
                        title: 'Pong!',
                        color: 0xeb1d02,
                        fields: [
                            {name: 'API latency', value: `${Math.round(interaction.client.ws.ping)} ms`}
                        ],
                        thumbnail: {url: 'https://www.iconsdb.com/icons/preview/white/ping-pong-xxl.png'}
                    }
                ],
                ephemeral: true
            });
        } else if (Math.round(interaction.client.ws.ping) >= 100) {
            await interaction.reply({
                embeds: [
                    {
                        title: 'Pong!',
                        color: 0xeb1d02,
                        fields: [
                            {name: 'API latency', value: `${Math.round(interaction.client.ws.ping)} ms`},
                            result
                        ],
                        thumbnail: {url: 'https://www.iconsdb.com/icons/preview/white/ping-pong-xxl.png'}
                    }
                ],
                ephemeral: true
            });
        }
    }
};