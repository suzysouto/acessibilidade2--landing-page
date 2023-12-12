import { links } from 'consts'
import { getObjectLength } from 'utils'

type fnTypes = () => void

export const loadLinks = (done?: fnTypes) => {
  let current = 0
  const total = getObjectLength(links)
  Object.keys(links).map((rel) => {
    links[rel].map((href: string) => {
      const link = document.createElement('link')
      link.href = href
      link.rel = rel
      document.head.appendChild(link)
      if (++current === total && done) done()
    })
  })
  if (!total && done) done()
}
