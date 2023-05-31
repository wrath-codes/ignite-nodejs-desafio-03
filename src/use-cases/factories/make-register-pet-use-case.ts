import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

import { RegisterPetUseCase } from '../register-pet'

export const makeRegisterPetUseCase = (): RegisterPetUseCase => {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaOrgsRepository = new PrismaOrgsRepository()

  const registerPetUseCase = new RegisterPetUseCase(
    prismaPetsRepository,
    prismaOrgsRepository,
  )

  return registerPetUseCase
}
