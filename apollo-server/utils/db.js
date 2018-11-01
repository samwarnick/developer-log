import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

let db;
if (connectionString) {
  db = new Client({
    connectionString: connectionString
  });
} else {
  db = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
  });
}
db.connect();

export { db };
