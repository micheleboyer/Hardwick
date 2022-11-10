const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('calculate')
        .setDescription('Calculates simple mathematic equations.')
        .addStringOption(option =>
            option.setName('equation')
                .setDescription('The equation you want to calculate')
                .setRequired(true)),
    async execute(interaction) {
        let result;
        let equationArray;
        if (interaction.options.getString('equation').includes(" ")) {
            equationArray = interaction.options.getString('equation').split(" ");
        } else {
            equationArray = interaction.options.getString('equation').split("");
        }
        var firstNumber = parseInt(equationArray[0]);
        var secondNumber = parseInt(equationArray[2]);
        var operator = equationArray[1];

        if(operator == "+") {
            result = firstNumber + secondNumber;
        } else if (operator == "-") {
            result = firstNumber - secondNumber;
        } else if (operator == "*") {
            result = firstNumber * secondNumber;
        } else if (operator == "/") {
            result = firstNumber / secondNumber;
        }

        await interaction.reply({
            embeds: [
                {
                    title: 'Result: 80085... just kidding.',
                    description: `Result: ${result}`,
                    thumbnail: {
                        url: 'https://www.iconsdb.com/icons/preview/white/calculator-8-xxl.png'
                    },
                    color: 0xFDFDFD
                }
            ]
        });
    }
}