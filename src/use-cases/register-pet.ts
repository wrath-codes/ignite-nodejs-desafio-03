import {
  Pet,
  PetAge,
  PetEnvironment,
  PetEnergy,
  PetIndependence,
  PetSize,
  PetRequirement,
} from '@prisma/client'
import { OrgNotFoundError } from './errors/org-not-found-error'
import { PetsRepository } from '@/repositories/interfaces/pets-repository'
import { OrgsRepository } from '@/repositories/interfaces/orgs-repository'
import { PetRequirementsRepository } from '@/repositories/interfaces/pet-requirements-repository'

interface RegisterPetRequest {
  pet: {
    name: string
    about: string
    age: PetAge
    size: PetSize
    energy: PetEnergy
    independence: PetIndependence
    environment: PetEnvironment
    requirements: string[]
    org_id: string
  }
}

interface RegisterPetResponse {
  pet: Pet
  pet_requirements: PetRequirement[]
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
    private petRequirementsRepository: PetRequirementsRepository,
  ) {}

  async execute({ pet }: RegisterPetRequest): Promise<RegisterPetResponse> {
    const org = await this.orgsRepository.findById(pet.org_id)
    if (!org) {
      throw new OrgNotFoundError()
    }

    const createdPet = await this.petsRepository.create({
      name: pet.name,
      age: pet.age,
      about: pet.about,
      size: pet.size,
      energy: pet.energy,
      independence: pet.independence,
      environment: pet.environment,
      org_id: pet.org_id,
    })

    if (!pet.requirements) {
      return {
        pet: createdPet,
        pet_requirements: [],
      }
    } else {
      if (pet.requirements.length === 0) {
        return {
          pet: createdPet,
          pet_requirements: [],
        }
      }

      await this.petRequirementsRepository.createMany(
        pet.requirements,
        createdPet.id as string,
      )

      const petRequirements = await this.petRequirementsRepository.findByPetId(
        createdPet.id as string,
      )

      return {
        pet: createdPet,
        pet_requirements: petRequirements,
      }
    }
  }
}
