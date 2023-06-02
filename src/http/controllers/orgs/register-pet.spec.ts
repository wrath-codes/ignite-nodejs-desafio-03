import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../../../app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to register a pet', async () => {
    const { token, org_id } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Example Pet',
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        age: 'BABY',
        size: 'SMALL',
        energy: 'LOW',
        independence: 'LOW',
        environment: 'OUTDOOR',
        requirements: ['Example Requirement', 'Another Example Requirement'],
        org_id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
