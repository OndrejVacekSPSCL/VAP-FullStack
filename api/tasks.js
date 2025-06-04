const express = require('express');
const db = require('../database/db');

const router = express.Router();

router.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/tasks', (req, res) => {
  const { title, status } = req.body;
  db.run(
    'INSERT INTO tasks (title, status) VALUES (?, ?)',
    [title, status],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Item created' });
    }
  );
});

router.get('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not Found' });
    res.json(row);
  });
});

module.exports = router;