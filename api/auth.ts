import http from './request'
import { SERVICE_NAMES } from '@/utils'

export const FETCH_AUTH = new (class extends http {
  login(body: any, needLoading = true) {
    return this.post(SERVICE_NAMES.LOGIN, body, needLoading)
  }

  refresh(body: any, needLoading = false) {
    return this.post(SERVICE_NAMES.REFRESH, body, needLoading)
  }

  getUserInfo(params?: any, needLoading = true) {
    return this.get(SERVICE_NAMES.ME, params, needLoading)
  }
})()
