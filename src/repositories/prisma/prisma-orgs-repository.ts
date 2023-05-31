import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '../interfaces/orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const org = await prisma.org.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: data.password_hash,
        whatsapp: data.whatsapp,
      },

      include: {
        address: true,
      },
    })

    return org
  }

  async findById(id: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: { id },
      include: {
        address: true,
      },
    })

    if (!org) return null

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: { email },
      include: {
        address: true,
      },
    })

    if (!org) return null

    return org
  }

  async findByCity(city: string): Promise<Org[]> {
    const orgs = await prisma.org.findMany({
      where: {
        address: {
          city,
        },
      },
      include: {
        address: true,
      },
    })

    if (!orgs) return []

    return orgs
  }

  async setOrgAddressId(
    org_id: string,
    address_id: string,
  ): Promise<Org | null> {
    const org = await prisma.org.update({
      where: { id: org_id },
      data: {
        address_id,
      },
      include: {
        address: true,
      },
    })

    if (!org) return null

    return org
  }
}
