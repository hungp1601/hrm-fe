/**
 * api cancel request
 * @param { String } uuid api ID
 * If there are the same UUIDs in the array, execute the phase request method
 * When the API returns, clear the ended API in the array
 */

import { type AbortApiType } from '@/types'

export const AbortApi = new (class abortController {
  // Record request API
  private static RequestPending: AbortApiType[] = []

  public removeRequestPending(uuid: string) {
    abortController.RequestPending.forEach(
      (item: AbortApiType, index: number, arr: AbortApiType[]) => {
        if (item.uuid === uuid) {
          item.cancel.abort()
          arr.splice(index, 1)
        }
      },
    )
  }

  public cancelAllPending() {
    abortController.RequestPending.forEach((item: AbortApiType) => {
      item.cancel.abort()
    })
    abortController.RequestPending = []
  }

  public clearRequestPending(uuid: string) {
    abortController.RequestPending = abortController.RequestPending.filter(
      (item: AbortApiType) => item.uuid !== uuid,
    )
  }

  public addRequestPending(item: AbortApiType) {
    abortController.RequestPending.push(item)
  }
})()
