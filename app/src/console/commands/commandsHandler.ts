import axios from 'axios';

export interface Command {
  command: string;
  response: string;
}

const commandAliases: { [key: string]: string } = {
  clear: "clear",
  cls: "clear",
  help: "help",
  echo: "echo",
  date: "date",
  random: "random",
  joke: "joke",
  about: "about",
  quote: "quote",
  fact: "fact",
};

const handleQuote = async (): Promise<string> => {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    const data = response.data;
    return `${data.content} — ${data.author}`;
  } catch (error) {
    return 'Failed to fetch quote.';
  }
};

const handleFact = async (): Promise<string> => {
  try {
    const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
    const data = response.data;
    return data.text;
  } catch (error) {
    return 'Failed to fetch fact.';
  }
};

const handleJoke = async (): Promise<string> => {
  try {
    const response = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single');
    const data = response.data;
    return data.joke;
  } catch (error) {
    return 'Failed to fetch joke.';
  }
};

export const handleCommand = async (inputCommand: string): Promise<Command> => {
  const [baseCommand, ...args] = inputCommand.split(" ");
  const command = baseCommand.toLowerCase();
  const resolvedCommand = commandAliases[command] || command;

  switch (resolvedCommand) {
    case "help":
      return { command: inputCommand, response: "Here is a list of commands: help, clear, cls, echo, date, random, joke, about, quote, fact" };
    case "clear":
      return { command: inputCommand, response: "COMMAND_CLEAR" };
    case "echo":
      return { command: inputCommand, response: args.join(" ") || "Echo what?" };
    case "date":
      return { command: inputCommand, response: new Date().toLocaleString() };
    case "random":
      return { command: inputCommand, response: `Random number: ${Math.floor(Math.random() * 100) + 1}` };
    case "joke":
      return { command: inputCommand, response: await handleJoke() };
    case "about":
      return { command: inputCommand, response: "My name is Andrei Balan, and I am a student pursuing Bachelor's degree in Computer Science." };
    case "quote":
      return { command: inputCommand, response: await handleQuote() };
    case "fact":
      return { command: inputCommand, response: await handleFact() };
    default:
      return { command: inputCommand, response: `Unknown command "${command}"` };
  }
};
