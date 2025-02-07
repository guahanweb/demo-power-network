// src/index.ts

import { default as express, Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/service-status', (req: Request, res: Response) => {
  res.type('text/plain');
  res.send('HEALTHY');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
