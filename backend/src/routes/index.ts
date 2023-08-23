import express, { Request, Response } from 'express';
import { SERVICE_NAME } from '../config';
import { decreaseCount, getCount, getHistory, increaseCount, login } from '../controllers/controllers';
import { checkToken } from '../middlewares/auth-middelwar';

const app = express.Router();

app.get('/', getHealth);
app.get('/health', getHealth);

app.post('/login', login);

app.get('/counter', checkToken, getCount);
app.get('/history', checkToken, getHistory);

app.post('/counter/incr', checkToken, increaseCount);
app.post('/counter/decr', checkToken, decreaseCount);

function getHealth(req: Request, res: Response) {
  res.status(200).json({
    ok: true,
    message: 'Healthy',
    serviceName: SERVICE_NAME,
  });
}

export default app;
