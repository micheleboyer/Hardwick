// Require needed djs classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, REST, Routes } = require('discord.js');
const { clientId, token } = require('./config.json');

// Create client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

const commands = [];
const comPath = path.join(__dirname, 'commands');
const comFiles = fs.readdirSync(comPath).filter(file => file.endsWith('.js'));

for (const file of comFiles) {
	const filePath = path.join(comPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}
const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('deploy-commands: Pulled outdated data of application commands'))
	.catch(console.error);
rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(data => console.log(`deploy-commands: Successfully stocked data of ${data.length} application commands`))
	.catch(console.error);

// When client is aready run code once
client.once('ready', () => {
	console.log('index: Client is ready');
});

client.on('interactionCreate',
	async interaction => {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error('index: ' + error);
			await interaction.reply({ content: 'There was a glitch. Try again later.', ephemeral: true });
		}
	});

// Login to Discord
client.login(token);