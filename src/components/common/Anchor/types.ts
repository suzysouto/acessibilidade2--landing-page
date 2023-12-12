import { ReactNode } from 'react'

export interface AnchorProps {
  href: string
  title?: string
  children?: ReactNode
  locale?: string
  [props: string]: any
}
