import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../data/models/user.model';
import { env } from '../../core/config/env';

export class AuthService {
  async signup(name: string, email: string, password: string) {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) throw new Error('Email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id, role: user.role }, env.jwtSecret, { expiresIn: '7d' });

    return {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    };
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid email or password');

    const token = jwt.sign({ id: user._id, role: user.role }, env.jwtSecret, { expiresIn: '7d' });
    return {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    };
  }
}
