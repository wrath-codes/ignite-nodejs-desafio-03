import { PetRequirement } from '@prisma/client'

export interface PetRequirementsRepository {
  createMany(requirements: string[], pet_id: string): Promise<PetRequirement[]>

  findByPetId(pet_id: string): Promise<PetRequirement[]>
}
