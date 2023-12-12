import { scripts } from 'consts'
import theme from 'styles/theme'

type fnTypes = () => void

export const loadScripts = (nonce: string, done?: fnTypes) => {
  let timeout = null
  const load = (src: string, fn?: fnTypes) => {
    const cb = () => {
      if (fn) fn()
    }
    const script = document.createElement('script')
    script.src = src
    script.nonce = nonce
    script.async = true
    script.onload = cb as (this: GlobalEventHandlers, ev: Event) => any
    script.onerror = cb as OnErrorEventHandlerNonNull
    document.head.appendChild(script)
  }
  const recursiveLoad = (index = 0) => {
    if (scripts.lazy[index])
      load(scripts.lazy[index], () => {
        recursiveLoad(index + 1)
      })
  }
  const loadLazyScripts = () => {
    if (timeout) clearTimeout(timeout)
    window.removeEventListener('scroll', loadLazyScripts, true)
    recursiveLoad()
  }
  const afterEager = () => {
    if (done) done()
    if (window?.innerWidth < theme.breakpoints.small) {
      window.addEventListener('scroll', loadLazyScripts, true)
      timeout = setTimeout(loadLazyScripts, 2000)
    } else loadLazyScripts()
  }
  scripts.eager
    .filter((x) => x)
    .map((src: string, index: number) => {
      const cb =
        index + 1 === scripts.eager.filter((x) => x).length ? afterEager : null
      load(src, cb)
    })
  if (!scripts.eager.filter((x) => x).length) {
    afterEager()
  }
}
