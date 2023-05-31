import { Prisma, Org, Address } from '@prisma/client'

export interface OrgsRepository {
  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  findByCity(city: string, addresses?: Address[]): Promise<Org[]>
  setOrgAddressId(org_id: string, address_id: string): Promise<Org | null>
}
