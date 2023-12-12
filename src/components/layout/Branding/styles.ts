import styled from '@emotion/styled'

export const Content = styled.div`
  display: flex;
  justify-content: center;
  height: 1.75rem;
  background-color: #f2f2f2;
`
export const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Anchor = styled.a`
  display: flex;
  align-items: center;
  white-space: nowrap;

  & + * {
    content: '';
    border-left: 1px solid #00000026;
    padding-left: 0.5rem;
    margin-left: 0.5rem;
  }
`
export const Text = styled.span`
  font:
    normal 400 0.75rem Roboto,
    sans-serif;
  color: #000;
`
export const Logo = styled.img`
  max-height: 1rem;
  padding-left: 0.5rem;
`
