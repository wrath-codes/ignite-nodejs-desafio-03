import { RegisterOrgUseCase } from '../register-org'
import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export const makeRegisterOrgUseCase = (): RegisterOrgUseCase => {
  const prismaAddressesRepository = new PrismaAddressesRepository()
  const prismaOrgsRepository = new PrismaOrgsRepository()

  const registerOrgUseCase = new RegisterOrgUseCase(
    prismaOrgsRepository,
    prismaAddressesRepository,
  )

  return registerOrgUseCase
}
