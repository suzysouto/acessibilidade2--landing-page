import { useEffect, useState, MutableRefObject } from 'react'

export const useInView = (
  ref: MutableRefObject<any>,
  once = false,
  full = true,
) => {
  const [inView, setInView] = useState(false)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const scroll = () => {
      if (!ref.current) return
      const style = window.getComputedStyle(
        document.getElementsByTagName('main')[0],
      )
      if (style.marginTop)
        setOffset(parseInt(style.marginTop.replace('px', ''), 10))
      if (
        ref.current.offsetTop - offset - (full ? 0 : window.innerHeight) <
          window.scrollY &&
        ref.current.offsetTop + ref.current.offsetHeight - offset >
          window.scrollY
      )
        setInView(true)
      else if (!once) setInView(false)
    }
    window.addEventListener('scroll', scroll, true)
    if (once && inView) window.removeEventListener('scroll', scroll, true)
    return () => {
      window.removeEventListener('scroll', scroll, true)
    }
  }, [inView, offset, full, once, ref])

  return { inView, offset }
}
