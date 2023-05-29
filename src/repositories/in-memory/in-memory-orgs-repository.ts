import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '../interfaces/orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      whatsapp: data.whatsapp,
      created_at: new Date(),
      address_id: null,
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
}
