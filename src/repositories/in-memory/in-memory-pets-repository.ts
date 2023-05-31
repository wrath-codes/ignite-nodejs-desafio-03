import { Prisma, Pet, Org } from '@prisma/client'
import { PetsRepository } from '../interfaces/pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      ...data,
      id: randomUUID(),
      created_at: new Date(),
      org_id: data.org_id as string,
      adopted: false,
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findPets(
    page: number,
    org_list: Org[],
    breed?: string,
    age?: number,
  ): Promise<Pet[]> {
    const pets = []
    if (!breed && !age) {
      for (const org of org_list) {
        const org_pets = this.items
          .filter((item) => item.org_id === org.id && item.adopted === false)
          .slice((page - 1) * 20, page * 20)
        pets.push(...org_pets)
      }
    } else if (breed && !age) {
      for (const org of org_list) {
        const org_pets = this.items
          .filter(
            (item) =>
              item.org_id === org.id &&
              item.breed === breed &&
              item.adopted === false,
          )
          .slice((page - 1) * 20, page * 20)
        pets.push(...org_pets)
      }
    } else if (!breed && age) {
      for (const org of org_list) {
        const org_pets = this.items
          .filter(
            (item) =>
              item.org_id === org.id &&
              item.age === age &&
              item.adopted === false,
          )
          .slice((page - 1) * 20, page * 20)
        pets.push(...org_pets)
      }
    } else {
      for (const org of org_list) {
        const org_pets = this.items
          .filter(
            (item) =>
              item.org_id === org.id &&
              item.breed === breed &&
              item.age === age &&
              item.adopted === false,
          )
          .slice((page - 1) * 20, page * 20)
        pets.push(...org_pets)
      }
    }

    if (pets.length === 0) {
      return []
    }

    return pets
  }
}
