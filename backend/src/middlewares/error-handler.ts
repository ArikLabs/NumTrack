import express from 'express';

export const handleErrors = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(`Route failed: ${req.url}`, err);
  res.status(500).send('Internal Server Error');
};
