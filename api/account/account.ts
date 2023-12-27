import { Http } from '../base/request'
import { SERVICE_NAMES } from '@/utils'

export class AccountService extends Http {
  endpoint = SERVICE_NAMES.Account
  name = SERVICE_NAMES.Account

  getUserInfo(params?: any, needLoading = true) {
    return this.get('/me', params, needLoading)
  }
}
