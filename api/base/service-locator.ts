import { Http } from './request'

function getEndpoint(serviceName: string) {
  const endpoint = process.env.BASE_API_URL
  const apiPath = serviceName
  return endpoint + apiPath
}

export class ServiceLocator {
  services: { [x: string]: Http } = {}

  constructor(names: { [x: string]: string } = {}) {
    Object.values(names).forEach((name) => {
      this.services[name] = new Http(getEndpoint(name))
    })
  }

  registerService(service: Http) {
    this.services[service.name] = service
  }

  getService(name: string): Http {
    try {
      if (!this.services[name]) {
        throw new Error(`Service ${name} does not exist`)
      }
    } catch (error) {
      console.error(error)
    }
    return this.services[name] as any
  }
}
