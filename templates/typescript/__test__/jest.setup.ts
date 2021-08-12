import { app } from '../src/app';

beforeAll(async () => {
  await app.start(4000);
});

afterAll(async () => {
  await app.end();
});
