import { useMemo } from 'react'
import Link from 'next/link'

import { Content } from './styles'
import { AnchorProps } from './types'

const Anchor = ({ href, title, children, locale, ...props }: AnchorProps) => {
  title =
    title ||
    (typeof children === 'string'
      ? children
      : typeof (children as any).props?.children === 'string'
        ? (children as any).props?.children
        : '')
  const isExternal = useMemo(() => href?.startsWith('http'), [href])

  return (
    <Content>
      {isExternal || href === '#' ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          title={title}
          {...props}
        >
          {children}
        </a>
      ) : href ? (
        <Link href={href} passHref locale={locale} title={title} {...props}>
          {children}
        </Link>
      ) : (
        <span>{children}</span>
      )}
    </Content>
  )
}

export default Anchor
