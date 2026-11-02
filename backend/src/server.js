import 'dotenv/config';
import app from './app.js';

app.listen(process.env.PORT, () =>
  console.log(`API running on port ${process.env.PORT}`)
);