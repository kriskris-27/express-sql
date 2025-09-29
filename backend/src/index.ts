import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({
        message:'hello from backend'
    })
})

app.listen(PORT ,() =>{
    console.log(`server is listening to port http://localhost:${PORT}/`);
})
