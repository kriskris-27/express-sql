import {Router} from "express";
import {pool} from "../db.js";

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

router.post('/' , async(req,res)=>{
    try{
        const {task} = req.body
        const result = await pool.query("INSERT INTO  todos (task) VALUES ($1) RETURNING *",[task])
        res.status(201)
.json(result.rows[0])
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
      }
})

router.delete('/:id',async(req,res)=>{
    const {id} =  req.params
    const result = await pool.query("DELETE FROM todos WHERE id = $1 RETURNING *",[id]);
    if(result.rowCount===0)
        return res.status(404).json({ error: "Todo not found" });
    res.json({ message: "Todo deleted", todo: result.rows[0] });
})

export default  router;