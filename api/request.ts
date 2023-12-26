/**
 * api encapsulation
 * @param { String } url URL API
 * @param { Object } methodAndOptions Request method and parameters body || params
 * @param { Object } needLoading Do you need to enable Loading?
 */

import { hash } from 'ohash'
import { LoadingStore, AuthStore } from '@/stores'
import { AbortApi } from '@/utils'
import {
  type ApiResType,
  type AbortApiType,
  type QueryFormType,
  type ApiMethodType,
} from '@/types'

export default class http {
  private static async fetch(
    url: string,
    methodAndOptions: ApiMethodType,
    needLoading?: boolean,
  ): Promise<any> {
    // Get environment variable BaseURL
    const runtimeConfig = useRuntimeConfig()
    const { apiBase } = runtimeConfig.public
    const reqUrl = `${apiBase}${url}`

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

          if (needLoading) {
            LoadingStore().FN_ADD_LOADING(apiUUID)
          }

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

          console.error(error)
        },
        // response to interception
        async onResponse({ request, response, options }) {
          AbortApi.clearRequestPending(apiUUID)
          LoadingStore().FN_REMOVE_LOADING(apiUUID)

          const { status, _data } = response
          if (status !== 200 && status !== 201) {
            if (_data.message.includes('jwt expired')) {
              const isValid = await http.handleRefreshToken()

              if (isValid) {
                const data = await http.handleRegetApi(
                  request,
                  options,
                  needLoading,
                )
                resolve(data)
              } else {
                reject(_data.message)
              }
            } else {
              http.handleErrorMessage(status, _data.message)
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
  private static async handleRegetApi(
    request: any,
    options: any,
    needLoading = true,
  ): Promise<any> {
    const apiUUID: string = hash(
      JSON.stringify(request) + JSON.stringify(options),
    )

    //! Remove these, otherwise it will loop infinitely
    options.key = apiUUID
    options.onRequest = null
    options.onRequestError = null
    options.onResponse = null
    options.onResponseError = null

    if (needLoading) {
      LoadingStore().FN_ADD_LOADING(apiUUID)
    }

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
  private static async handleRefreshToken(): Promise<boolean> {
    const { $toast } = useNuxtApp()

    // Get environment variable BaseURL
    const runtimeConfig = useRuntimeConfig()
    const { apiBase } = runtimeConfig.public
    const reqUrl = `${apiBase}`

    // Set refresh_token to be POST
    const tokenInit = {
      refreshToken: useCookie('refreshToken'),
    } as object

    // Setting access_token
    const token = useCookie('authorization')
    const headersInit: HeadersInit = {
      authorization: `Bearer ${token.value || ''}`,
    }
    // eslint-disable-next-line no-async-promise-executor
    return await new Promise(async (resolve) => {
      const { data } = (await useFetch(`${reqUrl}/user/refreshToken`, {
        method: 'post',
        body: tokenInit,
        headers: headersInit,
      })) as any

      const res = data._value

      if (!res?.accessToken || !res?.refreshToken) {
        // @ts-ignore
        $toast.error('Xin vui lòng đăng nhập lại')

        AuthStore().FN_REMOVE_TOKEN()

        const accessToken = useCookie('authorization')
        const refreshToken = useCookie('refreshToken')
        accessToken.value = null
        refreshToken.value = null

        const router = useRouter()
        router.push('/login')
        resolve(false)
      } else {
        const accessToken = useCookie('authorization')
        const refreshToken = useCookie('refreshToken')
        accessToken.value = res.accessToken
        refreshToken.value = res.refreshToken
        resolve(true)
      }
    })
  }

  // Error handling
  private static handleErrorMessage(status: number, message: string) {
    const { $toast } = useNuxtApp()

    switch (status) {
      case 401: {
        // @ts-ignore
        $toast.error(`${status} ${message}`)
        AuthStore().FN_REMOVE_TOKEN()
        break
      }
      case 404:
        // @ts-ignore
        $toast.error(`${status} ${message}`)

        break
      case 500:
        // @ts-ignore
        $toast.error(`${status} ${message}`)
        break
      default:
        // @ts-ignore
        $toast.error(`${status} ${message}`)
        break
    }
  }

  public async get(
    url: string,
    params?: QueryFormType,
    needLoading?: boolean,
  ): Promise<ApiResType> {
    return await http.fetch(url, { method: 'get', params }, needLoading)
  }

  public async post(
    url: string,
    body?: QueryFormType,
    needLoading?: boolean,
  ): Promise<ApiResType> {
    return await http.fetch(url, { method: 'post', body }, needLoading)
  }

  public async put(
    url: string,
    body?: QueryFormType,
    needLoading?: boolean,
  ): Promise<ApiResType> {
    return await http.fetch(url, { method: 'put', body }, needLoading)
  }

  public async delete(
    url: string,
    params?: QueryFormType,
    needLoading?: boolean,
  ): Promise<ApiResType> {
    return await http.fetch(url, { method: 'delete', params }, needLoading)
  }
}
