import { Prisma, Pet, Org } from '@prisma/client'

export interface PetsRepository {
  create(pet: Prisma.PetUncheckedCreateWithoutRequirementsInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findPets(
    page: number,
    org_list?: Org[] | undefined,
    age?: string | undefined,
    size?: string | undefined,
    energy?: string | undefined,
    independence?: string | undefined,
    environment?: string | undefined,
  ): Promise<Pet[]>
}
