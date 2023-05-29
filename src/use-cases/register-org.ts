import { OrgsRepository } from '@/repositories/interfaces/orgs-repository'
import { hash } from 'bcryptjs'
import { Org } from '@prisma/client'
import { AddressesRepository } from '@/repositories/interfaces/addresses-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists'

interface RegisterOrgRequest {
  org: {
    name: string
    email: string
    password: string
    whatsapp: string
  }
  address: {
    street: string
    number: string
    complement?: string
    city: string
    state: string
    zipcode: string
  }
}

interface RegisterOrgResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private addressesRepository: AddressesRepository,
  ) {}

  async execute({
    org,
    address,
  }: RegisterOrgRequest): Promise<RegisterOrgResponse> {
    const password_hash = await hash(org.password, 8)

    const orgAlreadyExists = await this.orgsRepository.findByEmail(org.email)

    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError()
    }

    const createdOrg = await this.orgsRepository.create({
      name: org.name,
      email: org.email,
      password_hash,
      whatsapp: org.whatsapp,
    })

    const createdAddress = await this.addressesRepository.create({
      street: address.street,
      number: address.number,
      complement: address.complement,
      city: address.city,
      state: address.state,
      zipcode: address.zipcode,
      org_id: createdOrg.id,
    })

    return {
      org: {
        ...createdOrg,
        address_id: createdAddress.id,
      },
    }
  }
}
