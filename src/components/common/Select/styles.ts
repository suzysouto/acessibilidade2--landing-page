import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 100vh;
`
export const Wrap = styled.div`
  position: relative;
  display: inline-block;
  color: #101010;
  font-size: 0.8125rem;
  line-height: 1.3846;
  text-align: left;

  * {
    cursor: default;
    user-select: none;
  }
`
export const Default = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  background-color: #fff;

  &:focus,
  &:focus-visible {
    outline: 5px auto -webkit-focus-ring-color;
  }
`
export const DefaultWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #767676;
  border-radius: 0.1875rem;

  &:focus,
  &:hover {
    border-color: #4f4f4f;
  }
`
export const DefaultText = styled.div`
  padding: 0 0.125rem 0 0.25rem;
`
export const LengthFix = styled.ul`
  &,
  li {
    height: 0;
  }
`
export const DefaultIndicator = styled.figure`
  display: block;
  width: 0.6rem;
  margin: 0 0.25rem;
`
const option = () => css`
  background-color: #fff;
  color: #101010;
`
const currentOption = () => css`
  background-color: #5e9ed6;
  color: #fff;
`
export const Desktop = styled.ul<{ isBottom: boolean; height: number }>`
  position: absolute;
  overflow: auto;
  top: ${(p) => (p.isBottom ? '100%' : 'initial')};
  bottom: ${(p) => (p.isBottom ? 'initial' : '100%')};
  left: 0;
  width: 100%;
  height: ${(p) => `${p.height}px`};
  background-color: #fff;
  border: 1px solid #767676;

  li {
    white-space: nowrap;

    &.current {
      ${() => currentOption()};
    }

    &,
    &:hover ~ li.current {
      ${() => option()};
    }

    &:hover {
      ${() => currentOption()};
    }
  }
`
export const Mobile = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
`
