import { Hono } from "hono";
import { AppDataSource } from "../data-source1";
import { TBoard } from "../entities/TBoard";

const router = new Hono();

router.get("/", async (c) => {
  let result: { success: boolean; data: any; msg: string } = {
    success: true,
    data: null,
    msg: ``,
  };
  try {
    result.data = "board router 잘 작동 합니다";
    return c.json(result);
  } catch (error: any) {
    return c.json(result);
  }
});

router.get("/get_memo_list", async (c) => {
  let result: { success: boolean; data: any; msg: string } = {
    success: true,
    data: null,
    msg: ``,
  };
  try {
    const boardRepo = AppDataSource.getRepository(TBoard);
    const memo = boardRepo.find();
    result.data = memo;
    return c.json(result);
  } catch (error: any) {
    return c.json(result);
  }
});

export default router;
