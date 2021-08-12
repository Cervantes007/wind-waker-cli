import { app } from './app';

const port = process.env.PORT || 4000;

app.start(+port).then(() => {
  console.log(`Wind Waker is up and running on http://localhost:${port}`);
});
