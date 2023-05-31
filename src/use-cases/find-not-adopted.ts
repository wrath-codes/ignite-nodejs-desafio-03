import { Pet } from '@prisma/client'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository'
import { CityNotFoundError } from './errors/city-not-found-error'

interface FindNotAdoptedRequest {
  city: string
  page: number
  breed?: string
  age?: number
}

interface FindNotAdoptedResponse {
  pets: Pet[]
}

export class FindNotAdoptedUseCase {
  constructor(
    private petsRepository: InMemoryPetsRepository,
    private orgsRepository: InMemoryOrgsRepository,
    private addressesRepository: InMemoryAddressesRepository,
  ) {}

  async execute({
    city,
    page,
    breed,
    age,
  }: FindNotAdoptedRequest): Promise<FindNotAdoptedResponse> {
    const addresses = await this.addressesRepository.findByCity(city)
    if (!addresses || addresses.length === 0) {
      throw new CityNotFoundError()
    }
    const orgs = await this.orgsRepository.findByCity(city, addresses)

    if (orgs.length === 0) {
      return {
        pets: [],
      }
    }

    const pets = await this.petsRepository.findPets(page, orgs, breed, age)

    return {
      pets,
    }
  }
}
