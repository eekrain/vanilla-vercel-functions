import type { BotType } from "../types";
import type { Update } from "telegraf/types";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const PORT = (process.env.PORT && parseInt(process.env.PORT, 10)) || 3000;
const VERCEL_URL = `${process.env.VERCEL_URL}`;

const production = async (
  req: VercelRequest,
  res: VercelResponse,
  bot: BotType
) => {
  console.log("🚀 ~ Bot runs in production mode");

  if (!VERCEL_URL) {
    console.error("🚀 ~ VERCEL_URL is not set.");
    throw new Error("VERCEL_URL is not set.");
  }

  const webhookInfo = await bot.telegram.getWebhookInfo();
  const webhookURL = `${VERCEL_URL}/api`;

  if (webhookInfo.url !== webhookURL) {
    console.log(`🚀 ~ deleting webhook ${VERCEL_URL}`);
    await bot.telegram.deleteWebhook();
    console.log(`🚀 ~ setting webhook: ${webhookURL}`);
    await bot.telegram.setWebhook(webhookURL);
  }

  if (req.method === "POST") {
    console.log("🚀 ~ req:", req);
    await bot.handleUpdate(req.body as unknown as Update, res);
  } else {
    res.status(200).json("Listening to bot events...");
  }
  console.log(`🚀 ~ starting webhook on port: ${PORT}`);
};
export { production };
