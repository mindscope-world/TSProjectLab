/**
 * src/server.ts
 * 
 * This is the entry point for the application.
 * It starts the Express server and listens for incoming HTTP requests.
 */

import app from './app';

/**
 * Server Configuration
 * 
 * Set the port for the server to listen on.
 * Uses the PORT environment variable if available, otherwise defaults to 3000.
 */
const PORT = process.env.PORT || 3000;

/**
 * Start Server
 * 
 * Initialize the HTTP server and begin listening for requests on the specified port.
 * Logs a message to the console when the server is successfully started.
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});