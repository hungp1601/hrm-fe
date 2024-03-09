import { Http } from '../base/request'
import { SERVICE_NAMES } from '@/utils'

export class UserService extends Http {
  endpoint = SERVICE_NAMES.User
  name = SERVICE_NAMES.User

  async getList(body: any) {
    console.log(body)
    const result = await this.post('/', body)
    return result
  }
}
