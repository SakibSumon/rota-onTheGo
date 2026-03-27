require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { getShifts } = require("./scraper");
const { isNewRota, saveRota } = require("./storage");
const cron = require("node-cron");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

async function sendMessage(message) {
  const channel = await client.channels.fetch(process.env.CHANNEL_ID);
  await channel.send(message);
}

function formatShifts(shifts) {
  return shifts
    .map((s) => `📅 ${s.date}\n⏰ ${s.start} → ${s.end}`)
    .join("\n\n");
}

async function checkAndNotify() {
  console.log("Checking rota...");
  try {
    const shifts = await getShifts();
    if (isNewRota(shifts)) {
      await sendMessage("📢 New rota published!\n\n" + formatShifts(shifts));
      saveRota(shifts);
      console.log("New rota detected — message sent.");
    } else {
      console.log("No new rota.");
    }
  } catch (err) {
    console.error("Error checking rota:", err);
  }
}

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
  await checkAndNotify();
  cron.schedule("*/10 * * * *", checkAndNotify);
});

client.login(process.env.DISCORD_TOKEN);

module.exports = { sendMessage };
