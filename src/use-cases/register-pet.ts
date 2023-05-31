import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { Pet } from '@prisma/client'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgNotFoundError } from './errors/org-not-found-error'

interface RegisterPetRequest {
  pet: {
    name: string
    age: number
    breed: string
    org_id: string
  }
}

interface RegisterPetResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: InMemoryPetsRepository,
    private orgsRepository: InMemoryOrgsRepository,
  ) {}

  async execute({ pet }: RegisterPetRequest): Promise<RegisterPetResponse> {
    const org = await this.orgsRepository.findById(pet.org_id)
    if (!org) {
      throw new OrgNotFoundError()
    }

    const createdPet = await this.petsRepository.create({
      name: pet.name,
      age: pet.age,
      breed: pet.breed,
      org_id: pet.org_id,
    })

    return {
      pet: createdPet,
    }
  }
}
