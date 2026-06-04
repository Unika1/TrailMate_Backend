import app from './app';
import { connectDatabase } from './core/config/database';
import { env } from './core/config/env';

connectDatabase().then(() => {
  app.listen(env.port, () => {
    console.log(`TrailMate backend running on http://localhost:${env.port}`);
  });
});
