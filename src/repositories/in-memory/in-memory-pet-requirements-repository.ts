import { PetRequirement } from '@prisma/client'
import { PetRequirementsRepository } from '../interfaces/pet-requirements-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetRequirementsRepository
  implements PetRequirementsRepository
{
  public items: PetRequirement[] = []

  async createMany(
    requirements: string[],
    pet_id: string,
  ): Promise<PetRequirement[]> {
    const petRequirements = requirements.map((current) => {
      return {
        id: randomUUID(),
        pet_id,
        requirement: current,
      }
    })

    petRequirements.forEach((newRequirement) => {
      this.items.push(newRequirement)
    })

    if (!petRequirements) {
      return []
    }

    return petRequirements
  }

  async findByPetId(pet_id: string): Promise<PetRequirement[]> {
    const petRequirements = this.items.filter((item) => item.pet_id === pet_id)

    if (!petRequirements) {
      return []
    }

    if (petRequirements.length === 0) {
      return []
    }

    return petRequirements
  }
}
