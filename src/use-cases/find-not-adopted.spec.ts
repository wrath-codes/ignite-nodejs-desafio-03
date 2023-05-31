import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FindNotAdoptedUseCase } from '@/use-cases/find-not-adopted'
import { hash } from 'bcryptjs'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let addressesRepository: InMemoryAddressesRepository
let sut: FindNotAdoptedUseCase

describe('Find Not Adopted Use Case', async () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    addressesRepository = new InMemoryAddressesRepository()
    sut = new FindNotAdoptedUseCase(
      petsRepository,
      orgsRepository,
      addressesRepository,
    )
  })
  it('should be able to find not adopted pets', async () => {
    const password_hash = await hash('123456', 6)

    const org_01 = await orgsRepository.create({
      name: 'Example Org 01',
      email: 'example@org01.com',
      password_hash,
      whatsapp: '1234567890',
    })

    const address_01 = await addressesRepository.create({
      street: 'Example Street 01',
      number: '123',
      complement: 'Example Complement 01',
      city: 'Example City 01',
      state: 'Example State 01',
      zipcode: '12345678',
      org_id: org_01.id,
    })

    await orgsRepository.setOrgAddressId(org_01.id, address_01.id)

    const org_02 = await orgsRepository.create({
      name: 'Example Org 02',
      email: 'example@org02',
      password_hash,
      whatsapp: '1234567890',
    })

    const address_02 = await addressesRepository.create({
      street: 'Example Street 02',
      number: '123',
      complement: 'Example Complement 02',
      city: 'Example City 02',
      state: 'Example State 02',
      zipcode: '12345678',
      org_id: org_02.id,
    })

    await orgsRepository.setOrgAddressId(org_02.id, address_02.id)

    const pet_01 = await petsRepository.create({
      name: 'Example Pet 01',
      age: 1,
      breed: 'Example Breed 01',
      org_id: org_01.id,
    })

    const pet_02 = await petsRepository.create({
      name: 'Example Pet 02',
      age: 1,
      breed: 'Example Breed 02',
      org_id: org_01.id,
    })

    const pet_03 = await petsRepository.create({
      name: 'Example Pet 03',
      age: 1,
      breed: 'Example Breed 03',
      org_id: org_02.id,
    })

    const pet_04 = await petsRepository.create({
      name: 'Example Pet 04',
      age: 1,
      breed: 'Example Breed 04',
      org_id: org_02.id,
    })

    const { pets } = await sut.execute({
      city: 'Example City 01',
      page: 1,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        id: pet_01.id,
      }),
      expect.objectContaining({
        id: pet_02.id,
      }),
    ])
    expect(pets).not.toEqual([
      expect.objectContaining({
        id: pet_03.id,
      }),
      expect.objectContaining({
        id: pet_04.id,
      }),
    ])
  })

  it('should be able to find not adopted pets by breed', async () => {
    const password_hash = await hash('123456', 6)

    const org_01 = await orgsRepository.create({
      name: 'Example Org 01',
      email: 'example@org01.com',
      password_hash,
      whatsapp: '1234567890',
    })

    const address_01 = await addressesRepository.create({
      street: 'Example Street 01',
      number: '123',
      complement: 'Example Complement 01',
      city: 'Example City 01',
      state: 'Example State 01',
      zipcode: '12345678',
      org_id: org_01.id,
    })

    await orgsRepository.setOrgAddressId(org_01.id, address_01.id)

    const org_02 = await orgsRepository.create({
      name: 'Example Org 02',
      email: 'example@org02',
      password_hash,
      whatsapp: '1234567890',
    })

    const address_02 = await addressesRepository.create({
      street: 'Example Street 02',
      number: '123',
      complement: 'Example Complement 02',
      city: 'Example City 02',
      state: 'Example State 02',
      zipcode: '12345678',
      org_id: org_02.id,
    })

    await orgsRepository.setOrgAddressId(org_02.id, address_02.id)

    const pet_01 = await petsRepository.create({
      name: 'Example Pet 01',
      age: 1,
      breed: 'Example Breed 01',
      org_id: org_01.id,
    })

    const pet_02 = await petsRepository.create({
      name: 'Example Pet 02',
      age: 1,
      breed: 'Example Breed 01',
      org_id: org_01.id,
    })

    await petsRepository.create({
      name: 'Example Pet 03',
      age: 1,
      breed: 'Example Breed 03',
      org_id: org_02.id,
    })

    await petsRepository.create({
      name: 'Example Pet 04',
      age: 1,
      breed: 'Example Breed 04',
      org_id: org_02.id,
    })

    const { pets } = await sut.execute({
      city: 'Example City 01',
      page: 1,
      breed: 'Example Breed 01',
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        id: pet_01.id,
      }),
      expect.objectContaining({
        id: pet_02.id,
      }),
    ])
  })

  it('should be able to find not adopted pets by age', async () => {
    const password_hash = await hash('123456', 6)

    const org_01 = await orgsRepository.create({
      name: 'Example Org 01',
      email: 'example@org01.com',
      password_hash,
      whatsapp: '1234567890',
    })

    const address_01 = await addressesRepository.create({
      street: 'Example Street 01',
      number: '123',
      complement: 'Example Complement 01',
      city: 'Example City 01',
      state: 'Example State 01',
      zipcode: '12345678',
      org_id: org_01.id,
    })

    await orgsRepository.setOrgAddressId(org_01.id, address_01.id)

    const org_02 = await orgsRepository.create({
      name: 'Example Org 02',
      email: 'example@org02',
      password_hash,
      whatsapp: '1234567890',
    })

    const address_02 = await addressesRepository.create({
      street: 'Example Street 02',
      number: '123',
      complement: 'Example Complement 02',
      city: 'Example City 02',
      state: 'Example State 02',
      zipcode: '12345678',
      org_id: org_02.id,
    })

    await orgsRepository.setOrgAddressId(org_02.id, address_02.id)

    const pet_01 = await petsRepository.create({
      name: 'Example Pet 01',
      age: 1,
      breed: 'Example Breed 01',
      org_id: org_01.id,
    })

    const pet_02 = await petsRepository.create({
      name: 'Example Pet 02',
      age: 1,
      breed: 'Example Breed 01',
      org_id: org_01.id,
    })

    await petsRepository.create({
      name: 'Example Pet 03',
      age: 2,
      breed: 'Example Breed 03',
      org_id: org_02.id,
    })

    await petsRepository.create({
      name: 'Example Pet 04',
      age: 2,
      breed: 'Example Breed 04',
      org_id: org_02.id,
    })

    const { pets } = await sut.execute({
      city: 'Example City 01',
      page: 1,
      age: 1,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        id: pet_01.id,
      }),
      expect.objectContaining({
        id: pet_02.id,
      }),
    ])
  })
})
