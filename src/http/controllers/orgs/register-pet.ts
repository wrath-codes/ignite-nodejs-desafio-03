import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'

export async function registerPet(req: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.enum(['BABY', 'YOUNG', 'ADULT', 'SENIOR']),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE']),
    energy: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    independence: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    environment: z.enum(['INDOOR', 'OUTDOOR', 'BOTH']),
    org_id: z.string().uuid(),
    requirements: z.array(z.string()),
  })

  const {
    name,
    about,
    age,
    size,
    energy,
    independence,
    environment,
    org_id,
    requirements,
  } = createPetBodySchema.parse(req.body)

  const useCase = makeRegisterPetUseCase()

  await useCase.execute({
    pet: {
      name,
      about,
      age,
      size,
      energy,
      independence,
      environment,
      org_id,
      requirements,
    },
  })

  return reply.status(201).send()
}
