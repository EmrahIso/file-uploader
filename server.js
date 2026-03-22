import express from 'express';
import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  config();
}

const PORT = process.env.PORT || 8000;

const app = express();

app.get('/', (req, res) => {
  res.send('Server is working!');
});

app.listen(PORT, () => {});
