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
      org_id: data.org_id,
    }

    this.items.push(address)

    return address
  }
}
