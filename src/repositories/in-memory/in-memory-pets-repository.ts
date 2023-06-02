import { Prisma, Pet, Org } from '@prisma/client'
import { PetsRepository } from '../interfaces/pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(
    pet: Prisma.PetUncheckedCreateWithoutRequirementsInput,
  ): Promise<Pet> {
    const createdPet = {
      id: pet.id || randomUUID(),
      name: pet.name,
      age: pet.age!,
      about: pet.about,
      size: pet.size!,
      energy: pet.energy!,
      independence: pet.independence!,
      environment: pet.environment!,
      org_id: pet.org_id!,
      adopted: false,
      created_at: new Date(),
    }

    this.items.push(createdPet)

    return createdPet
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
    age?: string | undefined,
    size?: string | undefined,
    energy?: string | undefined,
    independence?: string | undefined,
    environment?: string | undefined,
  ): Promise<Pet[]> {
    const pets = []

    for (const org of org_list) {
      const orgPets = this.items.filter((item) => item.org_id === org.id)
      pets.push(...orgPets)
    }

    const petsFiltered = pets.filter((pet) => {
      if (age && pet.age !== age) {
        return false
      }
      if (size && pet.size !== size) {
        return false
      }
      if (energy && pet.energy !== energy) {
        return false
      }
      if (independence && pet.independence !== independence) {
        return false
      }
      if (environment && pet.environment !== environment) {
        return false
      }
      return true
    })

    const petsSliced = petsFiltered.slice((page - 1) * 20, page * 20)

    if (petsSliced.length === 0) {
      return []
    }

    return petsSliced
  }
}
