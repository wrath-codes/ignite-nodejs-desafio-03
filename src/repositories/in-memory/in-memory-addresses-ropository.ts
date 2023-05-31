import { Prisma, Address } from '@prisma/client'
import { AddressesRepository } from '../interfaces/addresses-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryAddressesRepository implements AddressesRepository {
  public items: Address[] = []

  async create(data: Prisma.AddressUncheckedCreateInput): Promise<Address> {
    const address = {
      id: randomUUID(),
      street: data.street,
      number: data.number,
      complement: data.complement || null,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode,
      created_at: new Date(),
      org_id: data.org_id ?? null,
    }

    this.items.push(address)

    return address
  }

  async findByOrgId(org_id: string): Promise<Address | null> {
    const address = this.items.find((address) => address.org_id === org_id)
    if (!address) return null
    return address
  }

  async findByCity(city: string): Promise<Address[]> {
    const addresses = this.items.filter((address) => address.city === city)
    if (!addresses) return []
    return addresses
  }

  async setAddressOrgId(
    org_id: string,
    address_id: string,
  ): Promise<Address | null> {
    const address = this.items.find((address) => address.id === address_id)
    if (!address) return null
    address.org_id = org_id
    return address
  }
}
