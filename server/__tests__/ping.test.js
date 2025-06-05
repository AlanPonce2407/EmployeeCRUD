import request from 'supertest';
import index from '../index.js';

describe('GET /ping', () => {
    it('should return a 200 status and "pong" message', async () => {
        const response = await request(index).get('/ping');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('pong');
    });
})