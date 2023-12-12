import { Theme } from '@emotion/react'
import { StyledComponent } from '@emotion/styled'
import { VisualData } from '@starlightcms/react-sdk'
import { DetailedHTMLProps, ElementType, HTMLAttributes } from 'react'

export interface HtmlTypes {
  Wrap?: StyledComponent<
    {
      theme?: Theme
      as?: ElementType<any>
    },
    DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
  >
  html?: string | VisualData | null
  [k: string]: any
}
