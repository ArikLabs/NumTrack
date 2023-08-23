import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, users } from '../constants/users';

const secret = 'some-secret-key'; // TODO: move to env

function generateToken(user: User): string {
  return jwt.sign({ username: user.username }, secret);
}

function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

async function verifyToken(token: string): Promise<User | null> {
  try {
    const payload = jwt.verify(token, secret) as { username: string };
    const user = users.find((user) => user.username === payload.username);
    return user || null;
  } catch (err) {
    return null;
  }
}

export { generateToken, verifyPassword, verifyToken };
