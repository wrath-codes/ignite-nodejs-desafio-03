export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('An ORG with same email already exists!')
    this.name = 'OrgAlreadyExistsError'
  }
}
