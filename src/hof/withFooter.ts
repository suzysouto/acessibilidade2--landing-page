import Starlight from '@starlightcms/react-sdk'
import { ContextTypes, PropsTypes } from './types'

export const withFooter =
  (getProps: PropsTypes) =>
  async ({ req, customData, ...props }: ContextTypes) => {
    const footer =
      !req?.cookies?.has_context && (await Starlight.singletons.get('footer'))

    return getProps({
      ...props,
      req,
      customData: { ...customData, footer: footer ?? null },
    })
  }
