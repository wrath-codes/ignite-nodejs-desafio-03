import { PetRequirement } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PetRequirementsRepository } from '../interfaces/pet-requirements-repository'

export class PrismaPetRequirementsRepository
  implements PetRequirementsRepository
{
  async createMany(
    requirements: string[],
    pet_id: string,
  ): Promise<PetRequirement[]> {
    const petRequirements = await prisma.$transaction(
      requirements.map((requirement) => {
        return prisma.petRequirement.create({
          data: {
            pet_id,
            requirement,
          },
        })
      }),
    )

    return petRequirements
  }

  async findByPetId(pet_id: string): Promise<PetRequirement[]> {
    const petRequirements = await prisma.petRequirement.findMany({
      where: {
        pet_id,
      },
    })

    return petRequirements
  }
}
