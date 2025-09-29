import {Router} from "express";
import {pool} from "../db.js";
import type { Todo } from "../types.js";

const router = Router();


router.get("/",async (_,res)=>{
    const result = await pool.query<Todo>("SELECT * FROM todos ORDER BY id DESC");
    res.json(result.rows);
})

export default  router;