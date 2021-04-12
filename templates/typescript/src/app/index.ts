import { App, cors } from 'wind-waker';

const app = new App();

app.pipeline(cors());

export { app };
