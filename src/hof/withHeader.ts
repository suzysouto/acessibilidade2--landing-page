import Starlight from '@starlightcms/react-sdk'
import { ContextTypes, PropsTypes } from './types'

export const withHeader =
  (getProps: PropsTypes) =>
  async ({ req, customData, ...props }: ContextTypes) => {
    const header =
      !req?.cookies?.has_context && (await Starlight.singletons.get('header'))

    return getProps({
      ...props,
      req,
      customData: { ...customData, header: header ?? null },
    })
  }
