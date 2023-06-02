import {
  Prisma,
  Pet,
  Org,
  PetAge,
  PetSize,
  PetEnergy,
  PetIndependence,
  PetEnvironment,
} from '@prisma/client'
import { PetsRepository } from '../interfaces/pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data: {
        name: data.name,
        about: data.about,
        age: data.age,
        size: data.size,
        energy: data.energy,
        independence: data.independence,
        environment: data.environment,
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
    age?: string | undefined,
    size?: string | undefined,
    energy?: string | undefined,
    independence?: string | undefined,
    environment?: string | undefined,
  ): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        age: age as PetAge,
        size: size as PetSize,
        energy: energy as PetEnergy,
        independence: independence as PetIndependence,
        environment: environment as PetEnvironment,
        org: {
          id: {
            in: org_list?.map((org) => org.id),
          },
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
