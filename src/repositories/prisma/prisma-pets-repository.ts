import { Prisma, Pet, Org } from '@prisma/client'
import { PetsRepository } from '../interfaces/pets-repository'
import { prisma } from '@/lib/prisma'

export class InMemoryPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data: {
        name: data.name,
        breed: data.breed,
        age: data.age,
        adopted: false,
        org_id: data.org_id as string,
      },
    })

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findFirst({
      where: {
        id,
      },
    })

    if (!pet) {
      return null
    }

    return pet
  }

  async findPets(
    page: number,
    org_list?: Org[],
    breed?: string,
    age?: number,
  ): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        breed,
        age,
        adopted: false,
        org_id: {
          in: org_list?.map((org) => org.id),
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    if (!pets) {
      return []
    }

    return pets
  }
}
