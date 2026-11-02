import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
  const count = Math.min(parseInt(req.query.count) || 10, 100);
  const [rows] = await pool.query(
    'SELECT name, score FROM players ORDER BY score DESC LIMIT ?',
    [count]
  );
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { name, score } = req.body;
  if (!name || typeof name !== 'string' || name.length > 50 || !Number.isInteger(score)) {
    return res.status(400).json({ error: 'Invalid name or score' });
  }
  await pool.query('INSERT INTO players (name, score) VALUES (?, ?)', [name, score]);
  res.status(201).json({ name, score });
});

export default router;