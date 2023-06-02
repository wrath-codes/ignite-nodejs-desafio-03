import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFindNotAdoptedUseCase } from '@/use-cases/factories/make-find-not-adopted-use-case'

export async function findNotAdoptedPets(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const findNotAdoptedPetsQuerySchema = z.object({
    city: z.string(),
    page: z.string(),
    age: z.enum(['BABY', 'YOUNG', 'ADULT', 'SENIOR']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE']).optional(),
    energy: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    independence: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    environment: z.enum(['INDOOR', 'OUTDOOR', 'BOTH']).optional(),
  })

  const { city, page, age, size, energy, independence, environment } =
    findNotAdoptedPetsQuerySchema.parse(req.query)

  console.log(req.body)

  const useCase = makeFindNotAdoptedUseCase()

  const { pets } = await useCase.execute({
    city,
    page: Number(page),
    age,
    size,
    energy,
    independence,
    environment,
  })

  return reply.status(200).send({ pets })
}
