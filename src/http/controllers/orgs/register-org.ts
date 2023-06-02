import { makeRegisterOrgUseCase } from './../../../use-cases/factories/make-register-org-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists'

export async function registerOrg(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerOrgBodySchema = z.object({
    org: z.object({
      name: z.string().min(3).max(255),
      email: z.string().email(),
      password: z.string().min(6).max(50),
      whatsapp: z.string().min(11).max(11),
    }),
    address: z.object({
      street: z.string().min(3).max(255),
      number: z.string().min(1).max(10),
      complement: z.string().min(3).max(255).optional(),
      city: z.string().min(3).max(255),
      state: z.string().min(2).max(2),
      zipcode: z.string().min(8).max(8),
    }),
  })

  const { org, address } = registerOrgBodySchema.parse(request.body)

  try {
    const registerOrgUseCase = makeRegisterOrgUseCase()

    await registerOrgUseCase.execute({
      org,
      address,
    })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({
        message: 'Org already exists',
      })
    }
    throw error
  }

  return reply.status(201).send()
}
