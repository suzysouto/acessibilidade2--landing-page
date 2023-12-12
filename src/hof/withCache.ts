import { ContextTypes, PropsTypes } from './types'

export const withCache =
  (getProps: PropsTypes) =>
  async ({ res, ...props }: ContextTypes) => {
    const seconds = 60 * 15
    res?.setHeader('Cache-Control', `public, s-maxage=${seconds}`)

    return getProps({
      ...props,
      res,
      revalidate: seconds,
    })
  }
