import { Pet } from '@prisma/client'
import { CityNotProvidedError } from './errors/city-not-provided-error'
import { PetsRepository } from '@/repositories/interfaces/pets-repository'
import { OrgsRepository } from '@/repositories/interfaces/orgs-repository'
import { AddressesRepository } from '@/repositories/interfaces/addresses-repository'

interface FindNotAdoptedRequest {
  city: string
  page: number
  age?: string | undefined
  size?: string | undefined
  energy?: string | undefined
  independence?: string | undefined
  environment?: string | undefined
}

interface FindNotAdoptedResponse {
  pets: Pet[]
}

export class FindNotAdoptedUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
    private addressesRepository: AddressesRepository,
  ) {}

  async execute({
    city,
    page,
    age,
    size,
    energy,
    independence,
    environment,
  }: FindNotAdoptedRequest): Promise<FindNotAdoptedResponse> {
    const addresses = await this.addressesRepository.findByCity(city)
    if (!addresses) {
      throw new CityNotProvidedError()
    }

    if (addresses.length === 0) {
      return {
        pets: [],
      }
    }
    const orgs = await this.orgsRepository.findByCity(city, addresses)

    if (orgs.length === 0) {
      return {
        pets: [],
      }
    }

    const pets = await this.petsRepository.findPets(
      page,
      orgs,
      age,
      size,
      energy,
      independence,
      environment,
    )

    return {
      pets,
    }
  }
}
