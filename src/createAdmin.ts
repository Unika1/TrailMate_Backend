import bcrypt from 'bcryptjs';
import { connectDatabase } from './core/config/database';
import { UserModel } from './data/models/user.model';

/**
 * Create a new admin OR promote an existing user to admin.
 *
 * Usage:
 *   npm run create-admin -- <email> <password> [name]
 *
 * Examples:
 *   npm run create-admin -- admin@trailmate.com Secret123 "Admin User"
 *   npm run create-admin -- existing@user.com           (promotes existing user)
 */
async function createAdmin() {
  const [, , email, password, name] = process.argv;

  if (!email) {
    console.error('Usage: npm run create-admin -- <email> <password> [name]');
    process.exit(1);
  }

  await connectDatabase();

  const existing = await UserModel.findOne({ email });

  if (existing) {
    existing.role = 'admin';
    await existing.save();
    console.log(`Promoted existing user "${email}" to admin.`);
    process.exit(0);
  }

  if (!password) {
    console.error('User not found. Provide a password to create a new admin.');
    process.exit(1);
  }

  const hashed = await bcrypt.hash(password, 10);
  await UserModel.create({
    name: name || 'Admin',
    email,
    password: hashed,
    role: 'admin'
  });

  console.log(`Created new admin "${email}".`);
  process.exit(0);
}

createAdmin();
