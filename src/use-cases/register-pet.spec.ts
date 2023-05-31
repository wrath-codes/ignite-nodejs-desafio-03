import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

import { RegisterPetUseCase } from './register-pet'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { OrgNotFoundError } from './errors/org-not-found-error'

describe('Register Pet Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let orgsRepository: InMemoryOrgsRepository
  let sut: RegisterPetUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterPetUseCase(petsRepository, orgsRepository)
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
        age: 10,
        breed: 'Example Breed',
        org_id: org.id,
      },
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.org_id).toEqual(org.id)
  })

  it('should not be able to register a new pet if the org does not exist', async () => {
    await expect(
      sut.execute({
        pet: {
          name: 'Example Pet',
          age: 10,
          breed: 'Example Breed',
          org_id: 'non-existing-org-id',
        },
      }),
    ).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
