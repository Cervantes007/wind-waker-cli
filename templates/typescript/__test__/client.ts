import { Client } from 'wind-waker-client';

const client = new Client({ baseURL: 'http://localhost:4000' });
export const request = client.request;
