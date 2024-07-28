const db = require('./database');

function shutdown(server) {
  return () => {
    console.log('Shutting down server...');
    server.close(() => {
      console.log('Server closed');
      db.close((err) => {
        if (err) {
          console.error('Error closing database:', err.message);
        } else {
          console.log('Database connection closed');
        }
        process.exit(0);
      });
    });
  };
}

module.exports = shutdown;