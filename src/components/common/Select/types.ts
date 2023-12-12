import { Theme } from '@emotion/react'
import { StyledComponent } from '@emotion/styled'
import {
  DetailedHTMLProps,
  Dispatch,
  ElementType,
  HTMLAttributes,
  SelectHTMLAttributes,
  SetStateAction,
} from 'react'

export interface ValueTypes {
  title: string
  slug: string
}
export interface OptionsType {
  options: ValueTypes[]
  List:
    | string
    | StyledComponent<
        {
          theme?: Theme
          as?: ElementType<any>
        } & {
          isBottom?: boolean
          height?: number
        },
        DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>
      >
    | StyledComponent<
        {
          theme?: Theme
          as?: ElementType<any>
        },
        DetailedHTMLProps<
          SelectHTMLAttributes<HTMLSelectElement>,
          HTMLSelectElement
        >
      >
  Item: any //fix
  setCurrentValue?: (value: SetStateAction<ValueTypes>) => void
  currentValue?: ValueTypes
  optionsRef?: any //fix
  [k: string]: any
}

export interface SelectTypes {
  name: string
  setCurrentValue: Dispatch<SetStateAction<ValueTypes>>
  currentValue: ValueTypes
  options: ValueTypes[]
}
