import { connectDatabase } from './core/config/database';
import { TrekModel } from './data/models/trek.model';

/**
 * Clears all treks from the database.
 *
 * Treks are now managed entirely from the admin panel, so there is no
 * hardcoded sample data here. Run this only if you want to wipe the
 * treks collection and start from a clean slate:
 *
 *   npm run seed
 */
async function seed() {
  await connectDatabase();
  await TrekModel.deleteMany({});
  console.log('All treks cleared. Add treks from the admin panel.');
  process.exit(0);
}

seed();
