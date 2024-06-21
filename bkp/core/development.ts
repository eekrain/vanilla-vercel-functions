import type { BotType } from "../types";

const development = async (bot: BotType) => {
  const botInfo = (await bot.telegram.getMe()).username;

  console.log("🚀 ~ Bot runs in development mode");
  console.log(`BOT : "${botInfo} 🚀 ~ deleting webhook"`);
  await bot.telegram.deleteWebhook();
  console.log(`BOT : "${botInfo} 🚀 ~ start polling"`);

  await bot.launch();

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
};

export { development };
