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
    const memo = await boardRepo.find();
    result.data = memo;
    return c.json(result);
  } catch (error: any) {
    return c.json(result);
  }
});

router.post("/test1", async (c) => {
  let result: { success: boolean; data: any; msg: string } = {
    success: true,
    data: null,
    msg: ``,
  };
  try {
    const body = await c?.req?.parseBody();
    let title = String(body["title"]);
    let content = String(body["content"]);

    /* t_board 에 데이터 저장하기 */
    const boardRepo = AppDataSource.getRepository(TBoard);
    let newBoard = new TBoard();
    newBoard.title = title;
    newBoard.content = content;
    newBoard = await boardRepo.save(newBoard);
    result.data = newBoard;
    return c.json(result);
  } catch (error: any) {
    return c.json(result);
  }
});

export default router;
