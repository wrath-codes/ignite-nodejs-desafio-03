import { Prisma, Address } from '@prisma/client'
import { AddressesRepository } from '../interfaces/addresses-repository'
import { prisma } from '@/lib/prisma'

export class PrismaAddressesRepository implements AddressesRepository {
  async create(data: Prisma.AddressUncheckedCreateInput): Promise<Address> {
    const address = await prisma.address.create({
      data: {
        street: data.street,
        number: data.number,
        complement: data.complement || null,
        city: data.city,
        state: data.state,
        zipcode: data.zipcode,
        org_id: data.org_id ?? null,
      },
    })

    return address
  }

  async findByOrgId(org_id: string): Promise<Address | null> {
    const address = await prisma.address.findFirst({
      where: {
        org_id,
      },
    })

    if (!address) return null

    return address
  }

  async findByCity(city: string): Promise<Address[]> {
    const addresses = await prisma.address.findMany({
      where: {
        city,
      },
    })

    return addresses
  }

  async setAddressOrgId(
    org_id: string,
    address_id: string,
  ): Promise<Address | null> {
    const address = await prisma.address.update({
      where: {
        id: address_id,
      },
      data: {
        org_id,
      },
    })

    if (!address) return null

    return address
  }
}
