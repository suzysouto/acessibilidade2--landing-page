import {
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import { useRouter } from 'next/router'

import { sessionCookie } from 'helpers'

import AppContext, { GenericDataTypes, StoredTypes } from 'contexts/AppContext'

interface pagePropsTypes {
  header: GenericDataTypes
  footer: GenericDataTypes
}

export const useAppContext = (
  pageProps: any,
  update: Dispatch<SetStateAction<StoredTypes>>,
) => {
  const [timestamp, setTimestamp] = useState(Date.now())
  const context = useContext(AppContext)
  const router = useRouter()

  useEffect(() => {
    const { state } = context
    const { header, footer }: pagePropsTypes = pageProps
    if (!header && !footer && state.header && state.footer) return
    const currentCookie = parseInt(sessionCookie.get(), 10)

    state.header = header || state.header
    state.footer = footer || state.footer
    if (header || footer) update(context)
    if (header && footer) sessionCookie.init(currentCookie || timestamp)
    if (currentCookie && currentCookie !== timestamp) {
      setTimestamp(currentCookie)
      sessionCookie.clear()
      router.replace(router.asPath, undefined, { scroll: false })
    }
  }, [context, pageProps, router, timestamp, update])

  useEffect(() => {
    const unload = () => {
      sessionCookie.clear()
    }
    window.addEventListener('beforeunload', unload)
    return () => {
      window.removeEventListener('beforeunload', unload)
    }
  }, [])
}
