const { start } = require("./server");
const shutdown = require("./shutdown");

const PORT = process.env.PORT || 5002;
const server = start(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Handle shutdown
const gracefulShutdown = shutdown(server);
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGQUIT', gracefulShutdown);
