import { App, cors } from 'wind-waker';

const app = new App({ ui: process.env.NODE_ENV === 'development' });

app.pipeline(cors({ origin: 'http://localhost:8090' }));

export { app };
