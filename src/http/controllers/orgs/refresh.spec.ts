import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../../../app'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should de able to refresh a token', async () => {
    await request(app.server)
      .post('/orgs')
      .send({
        org: {
          name: 'Example Org',
          email: 'org@example.com',
          password: '123456',
          whatsapp: '21997105477',
        },
        address: {
          street: 'Example Street',
          number: '123',
          complement: 'Example Complement',
          city: 'Example City',
          state: 'EX',
          zipcode: '24360440',
        },
      })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'org@example.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('set-cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
