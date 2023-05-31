import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { RegisterOrgUseCase } from '@/use-cases/register-org'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists'
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository'

let orgsRepository: InMemoryOrgsRepository
let addressesRepository: InMemoryAddressesRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    addressesRepository = new InMemoryAddressesRepository()
    sut = new RegisterOrgUseCase(orgsRepository, addressesRepository)
  })

  // Base case
  it('should be able to register a new org', async () => {
    const { org } = await sut.execute({
      org: {
        name: 'Example Org',
        email: 'org@example.com',
        password: '123456',
        whatsapp: '1234567890',
      },
      address: {
        street: 'Example Street',
        number: '123',
        complement: 'Example Complement',
        city: 'Example City',
        state: 'Example State',
        zipcode: '12345678',
      },
    })

    expect(org.id).toEqual(expect.any(String))
  })

  // Password hash case
  it('should be able to hash the org password correctly', async () => {
    const { org } = await sut.execute({
      org: {
        name: 'Example Org',
        email: 'org@example.com',
        password: '123456',
        whatsapp: '1234567890',
      },
      address: {
        street: 'Example Street',
        number: '123',
        complement: 'Example Complement',
        city: 'Example City',
        state: 'Example State',
        zipcode: '12345678',
      },
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  // Duplicate email case
  it('should not be able to register a new org with duplicated email', async () => {
    const email = 'amazing-org@email.com'

    await sut.execute({
      org: {
        name: 'Example Org',
        email,
        password: '123456',
        whatsapp: '1234567890',
      },
      address: {
        street: 'Example Street',
        number: '123',
        complement: 'Example Complement',
        city: 'Example City',
        state: 'Example State',
        zipcode: '12345678',
      },
    })

    await expect(
      sut.execute({
        org: {
          name: 'Example Org',
          email,
          password: '123456',
          whatsapp: '1234567890',
        },
        address: {
          street: 'Example Street',
          number: '123',
          complement: 'Example Complement',
          city: 'Example City',
          state: 'Example State',
          zipcode: '12345678',
        },
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
