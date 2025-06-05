const express = require('express');
const db = require('../database/db');

const router = express.Router();

router.get('/team_members', (req, res) => {
  db.all('SELECT * FROM team_members', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/team_members', (req, res) => {
  const { firstname, lastname, email } = req.body;
  db.run(
    'INSERT INTO team_members (firstname, lastname, email) VALUES (?, ?, ?)',
    [firstname, lastname, email],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Person created' });
    }
  );
});

router.get('/team_members/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM team_members WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not Found' });
    res.json(row);
  });
});

router.put('/team_members/:id', (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email } = req.body;
  db.run(
    'UPDATE team_members SET firstname = ?, lastname = ?, email = ? WHERE id = ?',
    [firstname, lastname, email, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not Found' });
      res.status(201).json({ message: 'Member updated' });
    }
  );
});

router.delete('/team_members/:id', (req, res) => {
  const { id } = req.params;
  db.run(
    'DELETE FROM team_members WHERE id = ?',
    [id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not Found' });
      res.json({ message: 'Member deleted' });
    }
  );
});

module.exports = router;