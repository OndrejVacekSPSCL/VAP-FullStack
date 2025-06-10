const express = require('express');
const db = require('../database/db');

const router = express.Router();

router.get('/task_assignments', (req, res) => {
  db.all('SELECT * FROM task_assignments', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/task_assignments', (req, res) => {
  const { task_id, member_id } = req.body;
  db.run(
    'INSERT INTO task_assignments (task_id, member_id) VALUES (?, ?)',
    [task_id, member_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Member assigned to task', task_id, member_id });
    }
  );
});


router.put('/task_assignments/:id', (req, res) => {
  const { id } = req.params;
  const { task_id, member_id } = req.body;
  db.run(
    'UPDATE task_assignments SET task_id = ?, member_id = ? WHERE id = ?',
    [task_id, member_id, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not Found' });
      res.json({ message: 'Assignment updated', task_id, member_id });
    }
  );
});

router.delete('/task_assignments/:id', (req, res) => {
  const { id } = req.params;
  db.run(
    'DELETE FROM task_assignments WHERE id = ?',
    [id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not Found' });
      res.json({ message: 'Assignment deleted' });
    }
  );
});

module.exports = router;