import { Http } from '../base/request'
import {
  type LoginParams,
  type MeParams,
  type ForgotPasswordParams,
  type ResetPasswordParams,
} from './DTOs'
import { SERVICE_NAMES } from '@/utils'

export class AuthService extends Http {
  endpoint = SERVICE_NAMES.Auth
  name = SERVICE_NAMES.Auth

  login(body: LoginParams) {
    return this.post('/login', body)
  }

  getUserInfo(params?: MeParams) {
    return this.get('/me', params)
  }

  forgotPassword(params: ForgotPasswordParams) {
    return this.post('/forgot_password', params)
  }

  resetPassword(params: ResetPasswordParams) {
    const { password, token } = params
    return this.post('/reset_password', { password }, { token })
  }
}
