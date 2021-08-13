import { request } from './client';

describe('hello Action', () => {
  test('testing hello GET action', async () => {
    const name = 'Test GET';
    const response = await request('hello', { name }, { method: 'GET' });
    expect(response.status).toBe(200);
    expect(response.data).toBe(`Hello ${name}!`);
  });

  test('testing hello POST action', async () => {
    const name = 'Test POST';
    const response = await request('hello', { name });
    expect(response.status).toBe(200);
    expect(response.data).toBe(`Hello ${name}!`);
  });
});
