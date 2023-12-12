import styled from '@emotion/styled'
import { DegreesTypes, ItemTypes } from './types'

export const Content = styled.section`
  max-width: 100%;
  overflow: hidden;

  ul.glide__slides {
    overflow: visible;
  }
`
export const Item = styled.div<ItemTypes>`
  transform: skewX(${(p) => p.degrees}deg) translatez(1px);
  transform-origin: bottom;
  background-color: ${(p) =>
    p.isActive ? 'pink' : p.index % 2 ? 'cyan' : 'khaki'};
  overflow: hidden;
`
export const Normalize = styled.div<DegreesTypes>`
  transform: skewX(${(p) => p.degrees * -1}deg) translatez(1px);
  width: 100vw;
  max-width: 100%;
  height: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
