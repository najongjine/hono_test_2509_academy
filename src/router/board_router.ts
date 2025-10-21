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
    result.success = false;
    result.msg = `server error. ${error?.message ?? ""}`;
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
    result.success = false;
    result.msg = `server error. ${error?.message ?? ""}`;
    return c.json(result);
  }
});

router.get("/get_memo", async (c) => {
  let result: { success: boolean; data: any; msg: string } = {
    success: true,
    data: null,
    msg: ``,
  };
  try {
    let id = Number(c?.req?.query("id") ?? 0);
    const boardRepo = AppDataSource.getRepository(TBoard);
    /*
    SELECT
    *
    FROM t_baord
    WHERE id=1
    */
    const memo = await boardRepo.findOne({ where: { id: id } });
    result.data = memo;
    return c.json(result);
  } catch (error: any) {
    result.success = false;
    result.msg = `server error. ${error?.message ?? ""}`;
    return c.json(result);
  }
});

router.post("/upsert", async (c) => {
  let result: { success: boolean; data: any; msg: string } = {
    success: true,
    data: null,
    msg: ``,
  };
  try {
    const body = await c?.req?.parseBody();
    let id = Number(body["id"] ?? 0);
    let title = String(body["title"]);
    let content = String(body["content"]);

    /* t_board 에 데이터 저장하기 */
    const boardRepo = AppDataSource.getRepository(TBoard);
    let newBoard =
      (await boardRepo.findOne({ where: { id: id } })) ?? new TBoard();
    newBoard.title = title;
    newBoard.content = content;
    newBoard = await boardRepo.save(newBoard);
    result.data = newBoard;
    return c.json(result);
  } catch (error: any) {
    result.success = false;
    result.msg = `server error. ${error?.message ?? ""}`;
    return c.json(result);
  }
});

export default router;
