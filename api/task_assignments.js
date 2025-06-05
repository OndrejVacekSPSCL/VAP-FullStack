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



module.exports = router;