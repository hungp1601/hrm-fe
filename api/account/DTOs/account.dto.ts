export interface LoginParams {
  email: string
  password: string
  company_id?: number
}

export interface MeParams {
  token: string
}
