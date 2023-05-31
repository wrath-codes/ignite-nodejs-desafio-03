import { Prisma, Address } from '@prisma/client'

export interface AddressesRepository {
  create(data: Prisma.AddressUncheckedCreateInput): Promise<Address>
  findByOrgId(org_id: string): Promise<Address | null>
  findByCity(city: string): Promise<Address[]>
  setAddressOrgId(org_id: string, address_id: string): Promise<Address | null>
}
