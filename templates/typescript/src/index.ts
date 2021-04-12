import { app } from './app';

const port = 4000;

app.listen(port).then(() => {
  console.log(`Wind Waker is up and running on port ${port}`);
});
