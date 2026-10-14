/**
 * Server entry point. Starts the Express app on PORT (default 3000).
 */
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
