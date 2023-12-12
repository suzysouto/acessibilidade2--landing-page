import { useEffect, useState } from 'react'

import { fonts } from 'consts'

export const useLoaded = () => {
  const [fontLoaded, setFontLoaded] = useState(false)
  const [windowLoaded, setWindowLoaded] = useState(false)
  const [browserLoaded, setBrowserLoaded] = useState(false)

  useEffect(() => {
    setBrowserLoaded(true)
    const font = `1em ${Object.keys(fonts)[0]}`

    if (typeof document?.fonts?.check !== 'function' || !Object.keys(fonts)[0])
      setFontLoaded(true)
    else if (document.fonts.check(font)) setFontLoaded(true)
    else {
      const set = () => setFontLoaded(document.fonts.check(font))
      const oldEv = document.fonts.onloadingdone

      document.fonts.onloadingdone = function (ev) {
        if (oldEv) oldEv.apply(this, ev)
        set()
      }
      document.fonts.ready.then(() => {
        set()
      })
    }
    const handler = () => {
      setWindowLoaded(true)
    }
    if (document.readyState === 'complete') handler()
    else {
      window.addEventListener('load', handler)
      return () => window.removeEventListener('load', handler)
    }
  }, [])

  return { fontLoaded, windowLoaded, browserLoaded }
}
