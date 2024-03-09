export const getQueryParams = (): any => {
  return Object.fromEntries(new URLSearchParams(window.location.search))
}

export const changeQueryParams = (params: any) => {
  const searchParams = new URLSearchParams(window.location.search)
  for (const key in params) {
    searchParams.set(key, params[key])
  }
  window.history.pushState(
    {},
    '',
    `${window.location.pathname}?${searchParams.toString()}`,
  )
}
