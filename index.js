// Import required modules
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Randomizer Service! Use /random/number, /random/string, /random/color, or /random/date.');
});

// Generate a random number between min and max
app.get('/random/number', (req, res) => {
  const min = parseInt(req.query.min) || 0;
  const max = parseInt(req.query.max) || 100;

  if (min > max) {
    return res.status(400).json({ error: 'min cannot be greater than max.' });
  }

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  res.json({ min, max, randomNumber });
});

// Generate a random string of specified length
app.get('/random/string', (req, res) => {
  const length = parseInt(req.query.length) || 10;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  res.json({ length, randomString });
});

// Generate a random color in hex format
app.get('/random/color', (req, res) => {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  res.json({ randomColor });
});

// Generate a random date within a specified range
app.get('/random/date', (req, res) => {
  const startDate = new Date(req.query.startDate || '2000-01-01');
  const endDate = new Date(req.query.endDate || '2025-12-31');

  if (startDate >= endDate) {
    return res.status(400).json({ error: 'startDate must be earlier than endDate.' });
  }

  

  const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
  const randomDate = new Date(randomTime);
  res.json({ startDate: startDate.toISOString(), endDate: endDate.toISOString(), randomDate: randomDate.toISOString() });
});

// Not found route
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
