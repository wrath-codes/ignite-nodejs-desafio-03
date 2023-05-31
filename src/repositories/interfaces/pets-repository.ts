import { Prisma, Pet, Org } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findPets(
    page: number,
    org_list?: Org[] | undefined,
    breed?: string,
    age?: number,
  ): Promise<Pet[]>
}
