import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { registerOrg } from './register-org'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { registerPet } from './register-pet'
import { findNotAdoptedPets } from './find-not-adopted-pets'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrg)

  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/orgs/pets', findNotAdoptedPets)

  app.post(
    '/orgs/pets',
    {
      onRequest: [verifyJwt],
    },
    registerPet,
  )
}
