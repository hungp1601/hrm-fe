/* eslint-disable import/namespace */
import { ServiceLocator } from './base'
import * as Services from './services'
import { SERVICE_NAMES } from '@/utils/constants'
export * from './services'

const serviceLocator = new ServiceLocator(SERVICE_NAMES)

Object.keys(Services).forEach((key) => {
  if (key.endsWith('Service')) {
    const service = new Services[key]()
    serviceLocator.registerService(service)
  }
})

export const getService = (name: string) => {
  return serviceLocator.getService(name) as any
}

export { serviceLocator, SERVICE_NAMES }
