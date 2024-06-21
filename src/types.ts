import type { Context, Telegraf } from "telegraf";

export interface MySession {
  // Add session value you want to save here
  lastMessageId?: number;
}

export interface MyContext extends Context {
  // For accessing session
  // You need to configure session using @telegraf/session adapter
  session: MySession;
}

export type BotType = Telegraf<MyContext>;
