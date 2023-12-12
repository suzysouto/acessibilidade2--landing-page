import { sleep } from 'utils'

export const withRetry: {
  (fn: () => any, then?: (res: any) => any, index?: number)
} = async (fn, then, index = 0) => {
  if (index > 20) return null

  if (then) {
    return fn()
      .then(then)
      .catch((_e) => {
        setTimeout(() => {
          withRetry(fn, then, index + 1)
        }, 1000 * 10)
      })
  } else {
    try {
      return await fn()
    } catch (_e) {
      await sleep(1000 * 10)
      return withRetry(fn, then, index + 1)
    }
  }
}
