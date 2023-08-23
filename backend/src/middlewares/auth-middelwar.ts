import { Response, NextFunction } from 'express';
import { verifyToken } from '../services/auth';

async function checkToken(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const user = await verifyToken(token);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    res.status(401).json({ error: 'Missing token' });
  }
}

export { checkToken };
