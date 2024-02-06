export interface LoginParams {
  username: string
  password: string
}

export type ForgotPasswordParams = {
  email: string
}

export type ResetPasswordParams = {
  token: string
  password: string
}
