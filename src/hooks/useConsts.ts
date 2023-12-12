import { useEffect } from 'react'

import { loadLinks, loadScripts } from 'helpers'
import { useLoaded } from './useLoaded'

let isLoaded = false

export const useConsts = (nonce: string) => {
  const { windowLoaded } = useLoaded()

  useEffect(() => {
    if (!windowLoaded) return
    const done = () => {
      window.dispatchEvent(new Event('loaded'))
      if (document.fonts.onloadingdone) (document.fonts as any).onloadingdone()
    }
    // React's Strict Mode fires twice on dev
    // load fonts/links/scripts only once
    if (isLoaded) {
      done()
      return
    }
    isLoaded = true
    loadScripts(nonce, () => loadLinks(done))
  }, [windowLoaded, nonce])
}
