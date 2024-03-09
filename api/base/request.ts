/**
 * api encapsulation
 * @param { String } url URL API
 * @param { Object } methodAndOptions Request method and parameters body || params
 */

import { hash } from 'ohash'
import { LoadingStore, AuthStore } from '@/stores'
import { AbortApi } from '@/utils'
import { type ApiResType, type AbortApiType, type ApiMethodType } from '@/types'
import { ROUTER_NAMES } from '@/app/config/router.name'

export class Http {
  name: any
  endpoint: any

  constructor(name?: any, endpoint?: string) {
    if (endpoint) {
      this.endpoint = endpoint
    }
    if (name) {
      this.name = name
    }
  }

  private async fetch(
    url: string,
    methodAndOptions: ApiMethodType,
  ): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this

    const runtimeConfig = useRuntimeConfig()
    const { baseApiUrl } = runtimeConfig.public

    const reqUrl = baseApiUrl + this.endpoint + url

    const apiUUID: string = hash(JSON.stringify(methodAndOptions) + url)
    const token = useCookie('authorization')
    const headersInit: HeadersInit = {
      authorization: `Bearer ${token.value || ''}`,
    }

    return await new Promise((resolve, reject) => {
      useFetch(reqUrl, {
        // request interception
        onRequest({ options }) {
          Object.assign(options, {
            ...methodAndOptions,
            key: apiUUID,
            initialCache: false,
          })
          AbortApi.removeRequestPending(apiUUID)

          options.headers = headersInit

          const abortInstance = new AbortController()
          options.signal = abortInstance.signal

          const requestItem: AbortApiType = {
            uuid: apiUUID,
            cancel: abortInstance,
          }
          AbortApi.addRequestPending(requestItem)
        },
        // Request error interception
        onRequestError({ error }) {
          AbortApi.clearRequestPending(apiUUID)
          LoadingStore().FN_REMOVE_LOADING(apiUUID)

          if (error.message === 'net::ERR_CONNECTION_REFUSED') {
            // Handle the connection refused error here
            reject(error.message)
          } else {
            console.error(error)
            reject(error.message)
          }
        },
        // response to interception
        async onResponse({ request, response, options }) {
          AbortApi.clearRequestPending(apiUUID)
          LoadingStore().FN_REMOVE_LOADING(apiUUID)

          const { status, _data } = response
          if (status !== 200 && status !== 201) {
            const isTokeenExpired = _data?.detail.includes('expired')
            if (isTokeenExpired) {
              const isNewTokenValid = await that.handleRefreshToken()

              if (isNewTokenValid) {
                // call api again with new access token
                const data = await that.handleRegetApi(request, options)
                resolve(data)
              } else {
                reject(_data.detail)
              }
            } else {
              that.handleErrorMessage(status, _data.message)
              reject(_data.message)
            }
          } else {
            resolve(_data)
          }
        },
      }) as any
    })
  }

  // Retrieve API
  private async handleRegetApi(request: any, options: any): Promise<any> {
    const apiUUID: string = hash(
      JSON.stringify(request) + JSON.stringify(options),
    )

    //! Remove these, otherwise it will loop infinitely
    options.key = apiUUID
    options.onRequest = null
    options.onRequestError = null
    options.onResponse = null
    options.onResponseError = null

    const abortInstance = new AbortController()
    options.signal = abortInstance.signal

    const requestItem: AbortApiType = {
      uuid: apiUUID,
      cancel: abortInstance,
    }
    AbortApi.addRequestPending(requestItem)

    const token = useCookie('authorization')
    const headersInit: HeadersInit = {
      authorization: `Bearer ${token.value || ''}`,
    }
    // eslint-disable-next-line no-async-promise-executor
    return await new Promise(async (resolve, reject) => {
      const { data } = (await useFetch(request, {
        ...options,
        headers: headersInit,
      })) as any

      AbortApi.clearRequestPending(apiUUID)
      LoadingStore().FN_REMOVE_LOADING(apiUUID)

      if (data._value) {
        resolve(data._value)
      } else {
        reject(data)
      }
    })
  }

  // RefreshToken
  private async handleRefreshToken(): Promise<boolean> {
    const { $toast }: any = useNuxtApp()

    const runtimeConfig = useRuntimeConfig()
    const { baseApiUrl } = runtimeConfig.public

    // Set refresh_token to be POST
    const tokenInit = {
      token: useCookie('refreshToken'),
    } as object

    // Setting access_token
    const token = useCookie('authorization')
    const headersInit: HeadersInit = {
      authorization: `Bearer ${token.value || ''}`,
    }
    // eslint-disable-next-line no-async-promise-executor
    return await new Promise(async (resolve) => {
      const { data } = (await useFetch(`${baseApiUrl}/auth/refresh_token`, {
        method: 'post',
        params: tokenInit,
        headers: headersInit,
      })) as any

      const { access_token, refresh_token } = data.value.data

      const accessToken = useCookie('authorization')
      const refreshToken = useCookie('refreshToken')

      if (!access_token || !refresh_token) {
        // @ts-ignore
        $toast.error('Xin vui lòng đăng nhập lại')

        AuthStore().FN_REMOVE_TOKEN()

        accessToken.value = null
        refreshToken.value = null

        const router = useRouter()
        router.push({ name: ROUTER_NAMES.LOGIN })
        resolve(false)
      } else {
        accessToken.value = access_token
        refreshToken.value = refresh_token
        resolve(true)
      }
    })
  }

  // Error handling
  private handleErrorMessage(status: number, message: string) {
    const { $toast }: any = useNuxtApp()

    switch (status) {
      case 401: {
        // @ts-ignore
        $toast.error(`${message}`)
        break
      }
      case 404:
        // @ts-ignore
        $toast.error(`${message}`)

        break
      case 500:
        // @ts-ignore
        $toast.error(`${message}`)
        break
      default:
        // @ts-ignore
        $toast.error(`${message}`)
        break
    }
  }

  public get(url: string, params?: any): Promise<ApiResType> {
    return this.fetch(url, { method: 'get', params })
  }

  public post(url: string, body?: any, params?: any): Promise<ApiResType> {
    return this.fetch(url, { method: 'post', body, params })
  }

  public put(url: string, body?: any, params?: any): Promise<ApiResType> {
    return this.fetch(url, { method: 'put', body, params })
  }

  public delete(url: string, body?: any, params?: any): Promise<ApiResType> {
    return this.fetch(url, { method: 'delete', params, body })
  }

  public patch(url: string, body?: any, params?: any): Promise<ApiResType> {
    return this.fetch(url, { method: 'patch', params, body })
  }
}
