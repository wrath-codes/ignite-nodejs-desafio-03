import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../../../app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Find Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to find not adopted pets', async () => {
    const { token, org_id } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Example Pet 1',
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        age: 'BABY',
        size: 'SMALL',
        energy: 'LOW',
        independence: 'LOW',
        environment: 'OUTDOOR',
        requirements: ['Example Requirement', 'Another Example Requirement'],
        org_id,
      })

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Example Pet 2',
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        age: 'BABY',
        size: 'SMALL',
        energy: 'LOW',
        independence: 'LOW',
        environment: 'OUTDOOR',
        requirements: ['Example Requirement', 'Another Example Requirement'],
        org_id,
      })

    const response = await request(app.server)
      .get('/orgs/pets')
      .query({
        city: 'Example City',
        page: 1,
        age: 'BABY',
        size: 'SMALL',
        energy: 'LOW',
        independence: 'LOW',
        environment: 'OUTDOOR',
      })
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
