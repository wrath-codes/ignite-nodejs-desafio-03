import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

import { FindNotAdoptedUseCase } from '../find-not-adopted'

export const makeFindNotAdoptedUseCase = (): FindNotAdoptedUseCase => {
  const prismaAddressesRepository = new PrismaAddressesRepository()
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const prismaPetsRepository = new PrismaPetsRepository()

  const findNotAdoptedUseCase = new FindNotAdoptedUseCase(
    prismaPetsRepository,
    prismaOrgsRepository,
    prismaAddressesRepository,
  )

  return findNotAdoptedUseCase
}
