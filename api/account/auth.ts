import { Http } from '../base/request'
import { type LoginParams } from './DTOs'
import { SERVICE_NAMES } from '@/utils'

export class AuthService extends Http {
  endpoint = SERVICE_NAMES.Auth
  name = SERVICE_NAMES.Auth

  login(body: LoginParams) {
    return this.post('/login', body)
  }
}
