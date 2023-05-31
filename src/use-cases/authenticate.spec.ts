import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { AuthenticateUseCase } from './authenticate'
import { beforeEach, it, describe, expect } from 'vitest'
import { hash } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  // Test Authenticate an Org
  it('should be able to authenticate an org', async () => {
    await orgsRepository.create({
      name: 'Example Org',
      email: 'example@org.com',
      password_hash: await hash('123456', 6),
      whatsapp: '1234567890',
    })

    const { org } = await sut.execute({
      email: 'example@org.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  // Test Authenticate an Org with invalid email
  it('should not be able to authenticate an org with invalid email', async () => {
    await expect(
      sut.execute({
        email: 'example@org.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  // Test Authenticate an Org with invalid password
  it('should not be able to authenticate an org with invalid password', async () => {
    await orgsRepository.create({
      name: 'Example Org',
      email: 'example@org.com',
      password_hash: await hash('123456', 6),
      whatsapp: '1234567890',
    })

    await expect(
      sut.execute({
        email: 'example@org.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
