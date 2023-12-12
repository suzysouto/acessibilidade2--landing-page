import { ReactNode } from 'react'

import styled from '@emotion/styled'

interface ScrollIntoTypes {
  marginTop?: string
  isMobile: boolean
}

interface GoToTypes {
  url: string
  onClick?: () => void
  children: ReactNode
}

export const GoTo = ({ url, children, onClick }: GoToTypes) => {
  return (
    <a
      href={url}
      onClick={(e) => {
        if (onClick) onClick()
        const hash = url.replace('#', '')
        e.preventDefault()
        history.replaceState(
          null,
          null,
          document.location.pathname + '#' + hash,
        )
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      }}
    >
      {children}
    </a>
  )
}

const ScrollInto = styled.span<ScrollIntoTypes>`
  position: absolute;
  margin-top: ${(p) =>
    p.marginTop ?? p.isMobile ? '-2.5625rem' : '-5.875rem'};
`
export default ScrollInto
