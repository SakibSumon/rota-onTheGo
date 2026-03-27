require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once("clientReady", async () => {
  console.log("Bot is online");

  const channel = await client.channels.fetch(process.env.CHANNEL_ID);
  await channel.send("✅ Bot is working!");
});

client.login(process.env.DISCORD_TOKEN);
