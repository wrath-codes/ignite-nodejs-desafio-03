import { Pet } from '@prisma/client'
import { OrgNotFoundError } from './errors/org-not-found-error'
import { PetsRepository } from '@/repositories/interfaces/pets-repository'
import { OrgsRepository } from '@/repositories/interfaces/orgs-repository'

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
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
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
