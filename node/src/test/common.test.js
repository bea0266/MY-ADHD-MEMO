const request = require('supertest');
const app = require('../../index');

it('GET /memo 성공 시 200 status code를 반환한다.', async () => {
    const response = await request(app).get('/memo');
    expect(response.status).toEqual(200);
})