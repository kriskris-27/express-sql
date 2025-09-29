import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config();
const DB = process.env.DATABASE_URL;

export const pool = new Pool({
    connectionString : DB,
    ssl:{rejectUnauthorized:false},
});