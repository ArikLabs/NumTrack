import { generateToken, verifyPassword } from '../services/auth';
import { COUNTER_DECR, COUNTER_INCR, COUNTER_READ, users } from '../constants/users';
import { Request, Response } from 'express';
import countService from '../services/count-service';

export async function login(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (user && verifyPassword(password, user.password)) {
    const token = generateToken(user);

    res.json({ token, permissions: user.permissions });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
}

export async function getCount(req: any, res: Response): Promise<void> {
  const { permissions } = req.user;
  if (!permissions.includes(COUNTER_READ)) {
    res.status(403).json({ error: 'user does not have permission' });
  }

  res.json({ count: await countService.getCount() });
}

export async function getHistory(req: any, res: Response): Promise<void> {
  const { permissions } = req.user;
  if (!permissions.includes(COUNTER_READ)) {
    res.status(403).json({ error: 'user does not have permission' });
  }

  res.json({ history: await countService.getAllRecords() });
}

export async function increaseCount(req: any, res: Response): Promise<void> {
  await changeCountWithPermissionCheck(req, res, '+');
}

export async function decreaseCount(req: any, res: Response): Promise<void> {
  await changeCountWithPermissionCheck(req, res, '-');
}

async function changeCountWithPermissionCheck(req: any, res: Response, operation: '+' | '-'): Promise<void> {
  const { permissions, username } = req.user;
  const requiredPermission = operation === '+' ? COUNTER_INCR : COUNTER_DECR;

  if (!permissions.includes(requiredPermission)) {
    res.status(403).json({ error: 'user does not have permission' });
    return;
  }

  await countService.changeCount(username, operation);

  res.status(200).json({ message: 'success' });
}
