require('dotenv').config();
const app = require('./app');

const PORT = parseInt(process.env.PORT, 10) || 5000;

const server = app.listen(PORT, () => {
  console.log(`Bunna Bank API running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the process using this port or set a different PORT in your .env file.`);
    process.exit(1);
  }
  console.error('Server error:', err);
  process.exit(1);
});
