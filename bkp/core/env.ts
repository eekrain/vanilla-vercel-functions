import { z } from "zod";

// ZOD
// const envSchema = z.object({
//   NODE_ENV: z.string(),
//   BOT_TOKEN: z.string(),
// });

// export const env = envSchema.parse(process.env);

import * as v from "valibot";

// valibot
const envSchema = v.object({
  NODE_ENV: v.string(),
  BOT_TOKEN: v.string(),
});

export const env = v.parse(envSchema, process.env);
