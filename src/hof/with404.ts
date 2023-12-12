import { withRetry } from '.'
import { ContextTypes, PropsTypes } from './types'

export const with404 =
  (getProps: PropsTypes) =>
  async ({ ...props }: ContextTypes) => {
    return (
      (await withRetry(async () => {
        return await getProps(props)
      })) ?? {
        notFound: true,
      }
    )
  }
