import { Prisma, Org, Address } from '@prisma/client'
import { OrgsRepository } from '../interfaces/orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      whatsapp: data.whatsapp,
      created_at: new Date(),
      address_id: data.address_id ?? null,
    }
    this.items.push(org)

    return org
  }

  async findById(id: string): Promise<Org | null> {
    const org = this.items.find((org) => org.id === id)
    if (!org) return null
    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.items.find((org) => org.email === email)
    if (!org) return null
    return org
  }

  async findByCity(city: string, addresses: Address[]): Promise<Org[]> {
    const orgs = this.items.filter((org) => {
      const address = addresses.find((address) => address.id === org.address_id)
      if (!address) return false
      return address.city === city
    })
    if (!orgs) return []
    return orgs
  }

  async setOrgAddressId(
    org_id: string,
    address_id: string,
  ): Promise<Org | null> {
    const org = this.items.find((org) => org.id === org_id)
    if (!org) return null
    org.address_id = address_id
    return org
  }
}
