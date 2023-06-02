import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const org = await prisma.org.create({
    data: {
      name: 'Example Org',
      email: 'org@example.com',
      password_hash: await hash('123456', 6),
      whatsapp: '21997105477',
    },
  })

  await prisma.address.create({
    data: {
      street: 'Example Street',
      number: '123',
      complement: 'Example Complement',
      city: 'Example City',
      state: 'EX',
      zipcode: '24360440',
      org_id: org.id,
      org: {
        connect: {
          id: org.id,
        },
      },
    },
  })

  const updatedOrg = await prisma.org.findUnique({
    where: {
      id: org.id,
    },
    include: {
      address: true,
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: updatedOrg!.email,
    password: '123456',
  })

  const { token } = authResponse.body
  return {
    token,
    org_id: updatedOrg!.id,
  }
}
