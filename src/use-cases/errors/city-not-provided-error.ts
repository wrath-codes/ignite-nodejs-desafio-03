export class CityNotProvidedError extends Error {
  constructor() {
    super('City not provided!')
    this.name = 'CityNotProvidedError'
  }
}
