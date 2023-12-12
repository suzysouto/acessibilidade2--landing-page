import { Theme } from '@emotion/react'
import { StyledComponent } from '@emotion/styled'
import { FormikHelpers } from 'formik'
import {
  DetailedHTMLProps,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from 'react'

type EventsTypes = (
  values: { [k: string]: any },
  helpers: FormikHelpers<{ [k: string]: any }>,
) => void

export interface FormTypes {
  fields: { [k: string]: { [k: string]: any } }
  url?: string
  on?: {
    submit?: EventsTypes
    success?: EventsTypes
    error?: EventsTypes
  }
  Error?: StyledComponent<
    {
      theme?: Theme
      as?: ElementType<any>
    },
    DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
  >
  children: (any) => ReactNode
}
