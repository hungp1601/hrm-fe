import { Http } from '../base/request'
import { SERVICE_NAMES } from '@/utils'

export class AccountService extends Http {
  endpoint = SERVICE_NAMES.Account
  name = SERVICE_NAMES.Account
}
