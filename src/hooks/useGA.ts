import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { validGA } from 'utils'
import * as gtag from 'vendor/gtag'

export const useGA = () => {
  const router = useRouter()
  useEffect(() => {
    if (!validGA || process.env.NODE_ENV !== 'production') return
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}
