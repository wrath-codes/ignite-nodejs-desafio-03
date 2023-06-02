import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

import { RegisterPetUseCase } from '../register-pet'
import { PrismaPetRequirementsRepository } from '@/repositories/prisma/prisma-pet-requirements-repository'

export const makeRegisterPetUseCase = (): RegisterPetUseCase => {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const prismaPetRequirementRepository = new PrismaPetRequirementsRepository()

  const registerPetUseCase = new RegisterPetUseCase(
    prismaPetsRepository,
    prismaOrgsRepository,
    prismaPetRequirementRepository,
  )

  return registerPetUseCase
}
