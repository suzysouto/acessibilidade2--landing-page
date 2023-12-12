import styled from '@emotion/styled'

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Title = styled.h1`
  text-align: center;
  color: #f6187c;
  margin: 2rem 0 1rem;

  @media (max-width: ${(p) => p.theme.breakpoints.small}px) {
    font-size: 1rem;
  }
`
