import { Telegraf } from "telegraf";
import { command_start } from "./command/start";
import { development } from "./core/development";
import { production } from "./core/production";

import type { MyContext } from "./types";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const BOT_TOKEN = process.env.BOT_TOKEN || "";
const ENVIRONMENT = process.env.NODE_ENV || "";

const bot = new Telegraf<MyContext>(BOT_TOKEN);

// Use your session adapter here
// bot.use(session({ store: myTelegrafSessionStore }));
bot.start(command_start);

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};

// If it's in development mode, we should execute development() to change to polling mode from webhook mode that production / vercel has been set
ENVIRONMENT !== "production" && development(bot);
