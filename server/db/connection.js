import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.on('connect', () => {
  console.log('connected to the db');
});

export default pool;
