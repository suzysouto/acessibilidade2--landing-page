import { StaticImageData } from 'styles/images'

export interface ResponsiveImageTypes {
  src?: StaticImageData
  image?: { [k: string]: any }
  title?: string
  alt?: string
  objectFit?: string
  objectPosition?: string
  width?: number | string
  height?: number | string
  variation?: 'optimized' | 'original' | 'medium' | 'thumbnail'
  [props: string]: any
}
