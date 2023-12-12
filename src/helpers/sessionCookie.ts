import { getCookie } from 'utils'

const cookieString = (time = 0, val = '') =>
  `has_context=${val}; expires=${new Date(
    Date.now() + time,
  ).toUTCString()}; path=/`

export const sessionCookie = {
  init: (val: number) => {
    document.cookie = cookieString(864e5 * 365 * 10, val.toString())
  },
  clear: () => {
    document.cookie = cookieString()
  },
  get: (cookie = document.cookie) => getCookie('has_context', cookie),
}
