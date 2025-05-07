import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config();

const DbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432
}

export async function executeSQL(sqlScript){

    try{
        const pool = new Pool(DbConfig)
        const client = await pool.connect()
        const result = await client.query(sqlScript)
    }catch(error){
        console.log('Error ao executar o SQL '+ error)
    }

}