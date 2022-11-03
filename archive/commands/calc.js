//
//  This command is considered deprecated
//  Not considered useful to user experience
//

const math = require("mathjs");
const Discord = require("discord.js");
const path = require("path");

exports.run = (Client, message, args) => {
  const PmlClient = require(path.resolve(__dirname, "../index"));
  const Prismal = new PmlClient(Client, message);

  if (!args.join(" ")) {
    let helpScript = require("./help.js");
    helpScript.run(Client, message, (args = "calc"));
    Prismal.derror("calc", "No subcommand specified, contacting help handler");
    return;
  }

  const question = args.join(" ");

  let answer;
  try {
    answer = math.evaluate(question);
  } catch (err) {
    Prismal.newPrompt({
      type: "error",
      title: "calc",
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Exclamation_mark_white_icon.svg/2000px-Exclamation_mark_white_icon.svg.png",
      content: "Please enter a **valid** equation to be solved.",
      footer: `Hardwick | ${process.env.VersionNum}`
    });
  }

  Prismal.newPrompt({
    type: "generic",
    title: "Calculator",
    thumbnail:
      "https://www.iconsdb.com/icons/preview/white/calculator-8-xxl.png",
    color: "#FDFDFD",
    content: [
      {
        name: "Input",
        value: question,
      },
      {
        name: "Result",
        value: answer,
      },
    ],
    footer: `Hardwick | ${process.env.VersionNum}`
  });
};
