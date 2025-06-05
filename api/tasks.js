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

router.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;
  db.run(
    'UPDATE tasks SET title = ?, status = ? WHERE id = ?',
    [title, status, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not Found' });
      res.status(201).json({ message: 'Item updated' });
    }
  );
});

router.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.run(
    'DELETE FROM tasks WHERE id = ?',
    [id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not Found' });
      res.status(201).json({ message: 'Item deleted' });
    }
  );
});

module.exports = router;