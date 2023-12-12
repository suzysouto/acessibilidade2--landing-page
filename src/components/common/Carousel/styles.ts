import styled from '@emotion/styled'
import { ContentTypes } from './types'

export const Content = styled.div<ContentTypes>`
  .glide {
    &__bullets {
      position: absolute;
      bottom: 4%;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 14px;
    }

    &__bullet {
      --size: 0.5rem;

      width: var(--size);
      height: var(--size);
      border-radius: 50%;
      background: #c4c4c4;
      transition: all 0.175s ease;
      overflow: hidden;
      box-sizing: initial;
      border: 3px solid transparent;
      background-clip: padding-box;

      &:not(:last-of-type) {
        margin: 0 0.75rem 0 0;
      }

      &__active {
        --size: 14px;

        background: transparent;
        border: 3px solid #c4c4c4;
        box-sizing: border-box;
      }
    }
  }
`
export const Item = styled.li`
  width: 100%;
`
