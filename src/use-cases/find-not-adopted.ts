import { Pet } from '@prisma/client'
import { CityNotFoundError } from './errors/city-not-found-error'
import { PetsRepository } from '@/repositories/interfaces/pets-repository'
import { OrgsRepository } from '@/repositories/interfaces/orgs-repository'
import { AddressesRepository } from '@/repositories/interfaces/addresses-repository'

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
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
    private addressesRepository: AddressesRepository,
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
