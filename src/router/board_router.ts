import { Hono } from "hono";
import { AppDataSource } from "../data-source1";

const router = new Hono();

router.get("/test1", async (c) => {
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

export default router;
