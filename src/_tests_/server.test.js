const request = require('supertest')
const baseURL = 'http://localhost:8080'

describe('GET /ping', () => {
  it('should return 200', async () => {
    const response = await request(baseURL).get('/ping');
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBe('pong');
  });
});

describe('GET /search', () => {
  it('should return 200 and empty body without query string', async () => {
    const response = await request(baseURL).get('/search');
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toStrictEqual([]);
  });

  it('should return 200 and all matches with partial kit_id query string', async () => {
    const response = await request(baseURL).get('/search?kit_id=44');
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toHaveLength(10);
  });

  it('should return 200 and a single match with complete kit_id query string', async () => {
    const response = await request(baseURL).get('/search?kit_id=47-561-8310');
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toStrictEqual([{ "id": 1, "label_id": "47-561-8310", "shipping_tracking_code": "5796955810" }]);
  });
});
