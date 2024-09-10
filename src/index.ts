import express from 'express';
import { Pool } from 'pg';

const app = express();
const port = process.env.PORT || 3000;

// 設置 PostgreSQL 連接
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Database connected: ${result.rows[0].now}`);
  } catch (error) {
    res.status(500).send('Database connection failed');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});