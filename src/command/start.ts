import { MyContext } from "../types";

export const command_start = async (ctx: MyContext) => {
  console.log("🚀 ~ command start executed");
  await ctx
    .reply("Hello", {
      parse_mode: "HTML",
      disable_notification: true,
    })
    .catch((err: any) => {
      console.log("🚀 ~ start ~ err:", err);
    });
};
