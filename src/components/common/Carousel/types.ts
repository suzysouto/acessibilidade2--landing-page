import { Options } from '@glidejs/glide'

type Partial<T> = {
  [P in keyof T]?: T[P]
}

export type CarouselTypes = {
  options?: Partial<Options>
  hasArrows?: boolean
  hasDots?: boolean
  dots?: JSX.Element
  arrows?: JSX.Element
  children: JSX.Element[]
}

export type ContentTypes = {
  hasArrows?: boolean
}
