import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../../../app'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should de able to register an org', async () => {
    const response = await request(app.server)
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

    expect(response.status).toBe(201)
  })
})
