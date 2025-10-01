import {Router} from "express";
import {pool} from "../db.js";
import type { Todo } from "../types.js";

const router = Router();


router.get("/", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM todos ORDER BY created_at DESC");
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  });

export default  router;