import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetRequirementsRepository } from '@/repositories/in-memory/in-memory-pet-requirements-repository'
import {
  PetAge,
  PetEnergy,
  PetEnvironment,
  PetIndependence,
  PetSize,
} from '@prisma/client'
import { RegisterPetUseCase } from './register-pet'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { OrgNotFoundError } from './errors/org-not-found-error'

describe('Register Pet Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let orgsRepository: InMemoryOrgsRepository
  let petRequirementsRepository: InMemoryPetRequirementsRepository
  let sut: RegisterPetUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    petRequirementsRepository = new InMemoryPetRequirementsRepository()
    sut = new RegisterPetUseCase(
      petsRepository,
      orgsRepository,
      petRequirementsRepository,
    )
  })

  it('should be able to register a new pet', async () => {
    const password_hash = await hash('123456', 6)

    const org = await orgsRepository.create({
      name: 'Example Org',
      email: 'example@org.com',
      password_hash,
      whatsapp: '1234567890',
    })

    const { pet } = await sut.execute({
      pet: {
        name: 'Example Pet',
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        age: 'BABY' as PetAge,
        size: 'SMALL' as PetSize,
        energy: 'LOW' as PetEnergy,
        independence: 'LOW' as PetIndependence,
        environment: 'OUTDOOR' as PetEnvironment,
        requirements: ['Example Requirement', 'Another Example Requirement'],
        org_id: org.id,
      },
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(petRequirementsRepository.items).toHaveLength(2)
  })

  it('should not be able to register a new pet if the org does not exist', async () => {
    await expect(
      sut.execute({
        pet: {
          name: 'Example Pet',
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          age: 'BABY',
          size: 'SMALL',
          energy: 'LOW',
          independence: 'LOW',
          environment: 'OUTDOOR',
          requirements: ['Example Requirement', 'Another Example Requirement'],
          org_id: 'non-existing-org-id',
        },
      }),
    ).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
