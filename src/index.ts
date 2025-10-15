import { serve } from "@hono/node-server";
import { Hono } from "hono";

import * as dotenv from "dotenv";
import { AppDataSource } from "./data-source1.js";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: envFile });

const app = new Hono();

/** DB 연결 */
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
/** DB 연결 END */

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/test1", async (c) => {
  let result: { success: boolean; data: any; msg: string } = {
    success: true,
    data: null,
    msg: ``,
  };
  try {
    let q = c?.req?.query("q");
    result.data = q;
    return c.json(result);
  } catch (error: any) {
    return c.json(result);
  }
});
app.post("/test1", async (c) => {
  let result: { success: boolean; data: any; msg: string } = {
    success: true,
    data: null,
    msg: ``,
  };
  try {
    const body = await c?.req?.parseBody();
    let q = body["q"];
    result.data = q;
    return c.json(result);
  } catch (error: any) {
    return c.json(result);
  }
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
