import { Http } from '../base/request'
import { SERVICE_NAMES } from '@/utils'

export class AuthService extends Http {
  endpoint = SERVICE_NAMES.Auth
  name = SERVICE_NAMES.Auth

  login(body: any, needLoading = true) {
    return this.post('/login', body, needLoading)
  }
}
