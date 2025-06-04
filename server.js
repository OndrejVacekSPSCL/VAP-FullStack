const express = require('express');
const path = require('path');

const { initializeDatabase } = require('./database/db'); // vytváření databáze

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API routes
const tasksRoutes = require('./api/tasks');
app.use('/api', tasksRoutes);

const membersRoutes = require('./api/members');
app.use('/api', membersRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
